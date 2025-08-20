# api/my-python-endpoint.py
def handler(request):
    # request.query contains query parameters
    name = request.args.get("name", "World")
    return {
        "statusCode": 200,
        "body": f"Hello, {name} from Python!"
    }
