from django.conf.urls import patterns, include, url
from django.contrib import admin


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Q112.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^', include('queue.urls')),
    url(r'^$', 'Q112.views.home_page'),
    url(r'^allQs', 'Q112.views.old_qs'),
    url(r'^theQ', 'Q112.views.main_q'),
    url(r'^admin/', include(admin.site.urls)),
)
