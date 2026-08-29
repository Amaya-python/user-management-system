from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class UserProfile(models.Model):
    first_name = models.CharField(max_length=50)

    last_name = models.CharField(max_length=50)

    email = models.EmailField(
        unique=True
    )

    age = models.PositiveIntegerField(
        validators=[
            MinValueValidator(18, message="User must be at least 18 years old."),
            MaxValueValidator(100, message="Age cannot be greater than 100."),
        ]
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"