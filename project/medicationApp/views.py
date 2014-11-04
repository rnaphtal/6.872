from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader

# Create your views here.
def index(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/index.html')
    context = RequestContext(request, {
    })
    return HttpResponse(template.render(context))

def pete(request):
   # return HttpResponse("Hello, world. You're at the medicaiton app index.")
    template = loader.get_template('medicationApp/pete.html')
    context = RequestContext(request, {
    })
    return HttpResponse(template.render(context))
