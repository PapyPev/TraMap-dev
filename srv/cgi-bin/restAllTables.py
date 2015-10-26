#!/usr/bin/env python
# -*- coding: utf-8 -*- enable debugging

"""
  restAllTables.py
  This file is a REST service : return all tables name in database
"""

__author__ = "Pev"
__version__ = "1.0"
__email__ = "pev@gmx.fr"
__status__ = "Progress"

# IMPORT
# =============================================================================
import classDatabase


# MAIN
# =============================================================================

if __name__ == "__main__":
  cgitb.enable()
  print("Content-Type: application/json\n")
  print("\n") # Space End header
  classDatabase.Database()
