#from django.shortcuts import render

# Create your views here.


#def index(request, *args, **kwargs):
#    return render(request, 'public/index.html')

from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

