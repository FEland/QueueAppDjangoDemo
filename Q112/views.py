from django.shortcuts import render

def home_page(request):
  return render(request, 'home.html')

def main_q(request):
  return render(request, 'mainQ.html')

def old_qs(request):
  return render(request, 'archives.html')