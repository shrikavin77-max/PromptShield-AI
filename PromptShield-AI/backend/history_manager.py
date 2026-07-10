"""
history_manager.py

Stores session history.
"""

history = []


def add_history(result: dict):

    history.append(result)


def get_history():

    return history


def clear_history():

    history.clear()