import azure.functions as func
# from azure.cosmos.aio import CosmosClient
from azure.cosmos import exceptions
from azure.cosmos.partition_key import PartitionKey
import os
import logging
import json
from azure.cosmos import CosmosClient, exceptions

connection_string = os.environ["AzureConnectionString"]
client = CosmosClient.from_connection_string(connection_string)
# In the database, defining the actual container
database_name = "AzureResume"
container_name = "Counter"
item_id = "1"  # Assuming the item ID is "1"

# Get the database and container clients
database = client.get_database_client(database_name)
container = database.get_container_client(container_name)


app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

@app.function_name (name="resumecount")
@app.route(route="resumecount")
def resumecount(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    try:
        # Read the item from the container using a query
        #query = f"SELECT * FROM c WHERE c.id = '{item_id}'"
        query = f"SELECT * FROM c WHERE c.id = '1'"
        items = list(container.query_items(query=query, enable_cross_partition_query=True))
        if not items:
            return func.HttpResponse("Item not found", status_code=404)

        item = items[0]
        current_count = int(item.get('count', 0))  # Ensure count is treated as an integer

        # Increment the count
        updated_count = current_count + 1
        item['count'] = updated_count

        # Update the item in the container
        container.upsert_item(item)

        # Serialize the item to JSON
        item_json = json.dumps(item, indent=2)

        # Return the updated item as a JSON response
        # Return the item as a JSON response
        return func.HttpResponse(
        body=json.dumps({"count": updated_count}), 
        mimetype='application/json',
        status_code=200
        )

    except exceptions.CosmosHttpResponseError as e:
        logging.error(f"An error occurred: {e.message}")
        return func.HttpResponse(
            f"An error occurred: {e.message}",
            status_code=500
        )
