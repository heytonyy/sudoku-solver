from pymongo_config import connect_to_mongo

class BugReportModel:
    def __init__(self, data):
        self.id = data['id']
        self.image = data['image']
        self.solution = data['solution']
        self.reported_cells = data['reported_cells']
        self.created_at = data['created_at']
    
    def __repr__(self):
        return f'{{"id": {self.id}, "image": {self.image}, "solution": {self.solution}, "reported_cells": {self.reported_cells}, "created_at": {self.created_at}}}'

    @classmethod
    def save_to_mongo(cls, data):
        db = connect_to_mongo('sudoku', 'bug_reports')
        db.insert_one(data)

    @classmethod
    def find_by_id(cls, id):
        db = connect_to_mongo('sudoku', 'bug_reports')
        return db.find_one({'id': id})
    
    @classmethod
    def find_all(cls):
        db = connect_to_mongo('sudoku', 'bug_reports')
        return db.find_all({})
