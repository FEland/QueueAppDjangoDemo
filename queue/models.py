from django.db import models


class Queue(models.Model):
	title = models.CharField(max_length = 100, blank = True, default = '')
	timestamp = models.IntegerField(default = 0)

class QueueEntry(models.Model):
	name = models.CharField(max_length = 100, blank = True, default = '')
	queue = models.ManyToManyField(Queue, related_name = "entries")
	timestamp = models.IntegerField(default = 0)
	finished = models.BooleanField(default = False)