from django.contrib import admin
from .models import Todo
# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at', 'updated_at')
    search_fields = ('title',)
    # Allows inline editing of the status field directly from the list view.
    list_editable = ('status',)
    # Adds a date hierarchy navigation bar at the top to filter by the creation date.
    date_hierarchy = 'created_at'
    # Orders the todos by creation date in descending order.
    ordering = ('-created_at',)

admin.site.register(Todo,TodoAdmin)
