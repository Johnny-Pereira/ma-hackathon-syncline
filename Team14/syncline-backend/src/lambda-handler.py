
def lambda_handler(event, context):
    return {
    "statusCode": 200,
    "headers": { "Content-Type": "application/json",
                 'Access-Control-Allow-Origin': '*' },
    'isBase64Encoded': False,
    "body": "{\"message\": \"hello world\"}"
}