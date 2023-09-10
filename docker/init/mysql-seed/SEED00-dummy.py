import csv
import mysql.connector
import os
import uuid

db_connection = mysql.connector.connect(
    host='mysql-db',
    port='3306', 
    user='root',
    password= os.getenv('MYSQL_ROOT_PASSWORD'),  
    database='EquipHub'
)

current_directory = os.getcwd()
csv_file_path = os.path.join(current_directory, 'csv', 'dummy.csv')

cursor = db_connection.cursor()

with open(csv_file_path, 'r') as file:
    csv_data = csv.reader(file)
    next(csv_data)

    query = "INSERT INTO dummy (DummyID, Name) VALUES (%s, %s)"
    values = []


    for row in csv_data:
        generatedUUID = uuid.uuid4()
        DummyID = generatedUUID.bytes
        Name = row[0]
        values.append((DummyID, Name))

    try:
        cursor.executemany(query, values)

    except mysql.connector.Error as error:
        print(f"Error transferring data: {error}")

db_connection.commit()
cursor.close()
db_connection.close()
