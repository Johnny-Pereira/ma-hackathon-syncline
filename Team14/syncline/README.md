# ma-cre-lambda-template
A template project to copy from for creating AWS Lambda python functions

To manually build the project run the following commands. (Due to the use of environemnt variables in the template, you must have valid AWS token to run.)
### CI/CD:
    This project uses SAM to instruct AWS how to deploy the Lambda and then uses a build and deployment pipeline that invokes the build, runs tests, and deploys the lambda.
  #### SAM template (sam_template.yml):
  
    This file specifies the resources needed to run and deploy the lambda. In the case the only resource we have is the Lambda function itself.

~~~

                 Resources:
                    DevTemplateFunction:
                        Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
                        Properties:
                        FunctionName: ma-cre-lambda-reference
                        MemorySize: 5120
                        Timeout: 900
                        Policies:
                            - LambdaCreateNetworkInterface
                            - SecretsManagerReadWrite
                            - AWSLambdaBasicExecutionRole
                        Role: arn:aws:iam::865187950544:role/reis-lambda-execution-role
                        CodeUri: ./src/devTemplateService
                        Handler: devTemplateSvc_handler.lambda_handler
                        Runtime: python3.9
                        VpcConfig:
                            SecurityGroupIds:
                            - !Sub "{{resolve:secretsmanager:${Secret}:SecretString:SECURITYGROUP_IDS}}"
                            SubnetIds:
                            - !Sub "{{resolve:secretsmanager:${Secret}:SecretString:SUBNETID1}}"
                            - !Sub "{{resolve:secretsmanager:${Secret}:SecretString:SUBNETID2}}"
                        Architectures:
                            - x86_64
                        Environment:
                            Variables:
                           #for example: OpenSearchUrl: !Sub "{{resolve:secretsmanager:${Secret}:SecretString:OPENSEARCH_URL}}"
                        Events:
                            MyAPI:
                            Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
                            Properties:
                                Path: /properties
                                Method: post
~~~
       
      - These tags are requierd by CRE for tracking ownership and use of Lambda resources.

~~~
                          Tags:
                            contact: "joel.kass@moodys.com"
                            provisioned_by: "Joel Kass"
                            backup: "none"
                            cre_team: "REIS"
                            lob_division: "REIS"
                            application: !Sub "{{resolve:secretsmanager:${Secret}:SecretString:PROJECT_NAME}}"
                            environment: !Sub "{{resolve:secretsmanager:${Secret}:SecretString:ENV_SHORT}}"
                            owner: "sam.tailor@moodys.com"
                            account_env: !Sub "{{resolve:secretsmanager:${Secret}:SecretString:ENV_SHORT}}"
                            revenue: "n"
                            customer: "internal"
                            lob: "CRE"
                          
~~~~

#### Build Spec (buildspec.yml):

    The buildspec.yml file is a script that tells the AWS codebuild infrastructure how to build, test, and package the code. It is made up of several steps, and a failure in any step will fail build and cause the pipeline to stop.
    The first step instructs the Codebuild machine to install the Python 3.9 runtime

~~~
                                phases:
                                  install:
                                    runtime-versions:
                                      python: 3.9
                                    commands: pip3 -q install --upgrade pip
~~~

The pre-build step validates the SAM template that will be used to build the project. It then installs all the modules needed to run the unit tests in the folder. 
~~~~

                              pre_build:
                                on-failure: ABORT
                                commands:
                                - echo "Validating template..."
                                - sam validate -t sam_template.yml
                                - echo "Install pytest ...."
                                - pip3 install pytest
                                - pip3 install pytest-mock
                                - pip3 install -r src/devTemplateService/requirements.txt

~~~~


After everything required to do the build has been installed, buildspec runs the unit tests. If they pass, the fucntion is built per the SAM template, and the resulting artefacts are deployed to S3 for deployment by the next stage of the Build Pipeline.

~~~
                                build:
                                    on-failure: ABORT
                                    commands:
                                    - echo "Starting Run unit test..."
                                    - python3 -m pytest src/tests -v
                                    - echo "Unit tests complete. Beginning SAM build"
                                    - sam build
                                    - echo "SAM build complete. Beginning Cloudformation deployment"
                                    - aws cloudformation package --template .aws-sam/build/template.yaml --s3-bucket "$S3_BUCKET_NAME" --output-template template-export.yml
                                    - echo "Lambda function artifacts created and ready for deployment" 
~~~

The Cloudformation phase packs the Lambda function into a deployment package that is stored in an s3 Bucket. The Deployment stage of the Codepipeline then deploys the code artifacts from the bucket to the specified AWS Lambda instance.


  ### CodeBuild and CodePipeline

Building an AWS CodePipeline to build and deploy the project is done via CRE Terraform. The terraform scripts can be found in the moodysanalytics/reis-infra git repository.

  1. Navigate to the environment/account. In this case it's in reis-infra/865187950544-reis-nprod/
  2. Create a folder in that environment to hold the terraform project for you application. (In this case it's 'comp')
  3. Copy over the tf files from another project in that environment.
  
  ![Alt text](readme-images/terraform1.jpg?raw=true)

  4. Open the main.tf file and replace the shaded references with the appropriate values for your application
     ![Alt text](readme-images/terraform2.jpg?raw=true)
     ![Alt text](readme-images/terraform3.jpg?raw=true) 


 5. After you've made your changes, post a PR to the ops team and they will run the terraform to create the Codepipeline.