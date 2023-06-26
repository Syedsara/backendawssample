import psycopg2

connection = psycopg2.connect(
host='localhost',
database='sql_demo',
user='postgres',
password='sara'
)

cursor = connection.cursor()

for i in range(100):
  name = f'Patient{i}'
  age = 20 + i
  cursor.execute("INSERT INTO patients (name, age) VALUES (%s, %s)", (name, age))

connection.commit()
cursor.close()
connection.close()