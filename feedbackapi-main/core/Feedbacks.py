# -*- coding: utf-8 -*-

from pydantic import BaseModel

class Feedback(BaseModel):
    feedback: str