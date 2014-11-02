from rest_framework import serializers
from queue.models import Queue, QueueEntry

class QueueSerializer(serializers.ModelSerializer):

	class Meta:
		model = Queue
		fiels = ('title', 'timestamp')

class QueueEntrySerializer(serializers.ModelSerializer):

	class Meta:
		model = QueueEntry
		fields = ('name', 'queue', 'timestamp', 'finished')