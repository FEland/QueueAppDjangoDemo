from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from queue.models import Queue, QueueEntry
from queue.serializers import QueueSerializer, QueueEntrySerializer
import time

# Create your views here.


class QueueList(APIView):

	@staticmethod
	def queue_compare(a,b):
		return a.timestamp - b.timestamp

	def get(self, request, format = None):
		queues = Queue.objects.all()
		serializer = QueueSerializer(queues, many = True)
		return Response(serializer.data)

class QueueEntries(APIView):

	def get(self, request, qID, format = None):
		queue = Queue.objects.get(id = qID)
		entries = queue.entries.all()
		serializer = QueueEntrySerializer(entries, many = True)
		return Response(serializer.data)

class CurrentQueue(APIView):

	def get(self, request, format = None):
		queues = Queue.objects.all()
		currQ = 0
		for q in queues:
			if currQ == 0:
				currQ = q
			elif q.timestamp > currQ.timestamp:
				currQ = q
		serializer = QueueSerializer(currQ)
		return Response(serializer.data)

class AddEntry(APIView):

	def post(self, request, qID, format = None):
		name = request.DATA.get('name', False)
		if not name:
			return Response(["No name given"])
		q = Queue.objects.get(id = int(qID))
		entry = QueueEntry(name = name, timestamp = int(time.time()), finished = False)
		entry.save()
		q.entries.add(entry)
		return Response()