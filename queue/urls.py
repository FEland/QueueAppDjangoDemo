from django.conf.urls import patterns, include, url
from django.contrib import admin
from queue import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Q112.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^1/queues', views.QueueList.as_view()),
    url(r'^1/currentQ', views.CurrentQueue.as_view()),
    url(r'^1/entries/(?P<qID>[A-Za-z0-9-_]+)', views.QueueEntries.as_view()),
    url(r'^1/addentry/(?P<qID>[A-Za-z0-9-_]+)', views.AddEntry.as_view())
)