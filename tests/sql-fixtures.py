"""Verify every displayed practical result with isolated synthetic SQLite fixtures.

Queries use the PostgreSQL-compatible subset checked against official documentation.
This test makes no connection to an external database.
"""
import json
import pathlib
import sqlite3

root = pathlib.Path(__file__).resolve().parents[1]
data = json.loads((root / 'src/data/sql-practice.json').read_text())
db = sqlite3.connect(':memory:')
db.executescript('''
CREATE TABLE departments (id INTEGER PRIMARY KEY, name VARCHAR(50));
CREATE TABLE employees (
  id INTEGER PRIMARY KEY, name VARCHAR(50), age INTEGER,
  dept_id INTEGER REFERENCES departments(id)
);
''')
db.executemany('INSERT INTO departments VALUES (?,?)', data['departments'])
db.executemany('INSERT INTO employees VALUES (?,?,?,?)', data['employees'])
for query in data['queries']:
    cursor = db.execute(query['code'])
    actual = [list(row) for row in cursor.fetchall()]
    assert actual == query['rows'], (query['id'], actual, query['rows'])
    assert [column[0] for column in cursor.description] == query['columns']
assert db.execute('SELECT name FROM employees WHERE dept_id = NULL').fetchall() == []
assert db.execute('SELECT COUNT(*) FROM employees').fetchone()[0] == 4
print('PASS: 6 exact result sets, column labels, INNER/LEFT JOIN NULL row, NULL comparison and deterministic tie order.')
db.close()
