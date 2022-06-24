from django.urls import path
from .views import Representatives, MemberID, Votes, Information

urlpatterns = [
    path('representatives', Representatives.as_view()),
    path('memberID', MemberID.as_view()),
    path('votes', Votes.as_view()),
    path('info', Information.as_view())
    
]