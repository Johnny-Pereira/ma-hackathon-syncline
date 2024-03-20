import json
import os
import openai
import boto3
from botocore.exceptions import ClientError


def get_secret():

    secret_name = "OpenAIKey"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    secret = get_secret_value_response['SecretString']
    return secret




def lambda_handler(event, context):
    openai.api_key = get_secret()
    
    # const openai = new OpenAI({
    #   apiKey: process.env.OPENAI_API_KEY,
    # });

    # Extract text input from the Lambda event
    input_text = 'What is the meaning of life?' #event['text']
    #event expects a json as input

    try:
        # Make the request to OpenAI's API
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=input_text,
            max_tokens=100  # You can adjust this parameter based on your needs
        )

        # Extract the generated text from the response
        generated_text = response.choices[0].text.strip()

        # Return the generated text
        return {
            'statusCode': 200,
            'body': generated_text
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }
