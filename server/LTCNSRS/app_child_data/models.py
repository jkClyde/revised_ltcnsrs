from django.db import models
from django.core.exceptions import ValidationError

class MMDDYYYYDateField(models.DateField):
    def to_python(self, value):
        if value:
            try:
                # Convert mm/dd/yyyy format to yyyy-mm-dd format
                month, day, year = map(int, value.split('/'))
                value = f'{year:04d}-{month:02d}-{day:02d}'
            except ValueError:
                raise ValidationError('Enter a valid date in mm/dd/yyyy format.')
        return super().to_python(value)

from django.db import models

class ChildInformation(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    suffix = models.CharField(max_length=10, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    birth_weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    aim = models.CharField(max_length=100, blank=True, null=True)
    birth_order = models.PositiveIntegerField(blank=True, null=True)
    house_number = models.CharField(max_length=100, blank=True, null=True)
    sitio = models.CharField(max_length=100, blank=True, null=True)
    barangay = models.CharField(max_length=100, blank=True, null=True)
    status_of_residency = models.CharField(max_length=100, blank=True, null=True)
    length_of_stay = models.PositiveIntegerField(blank=True, null=True)
    duration_type = models.CharField(max_length=100, blank=True, null=True)
    is_archieved = models.BooleanField(default=False)  # New field


    def __str__(self):
        fullname = ""
        if self.first_name:
            fullname += self.first_name + " "
        if self.middle_name:
            fullname += self.middle_name + " "
        if self.last_name:
            fullname += self.last_name + " "
        if self.suffix:
            fullname += self.suffix + " "
        return fullname.strip()



# PARENT ====================================================================================================
class Parent(models.Model):
    child = models.ForeignKey(ChildInformation, on_delete=models.CASCADE, null=True)
    father_first_name = models.CharField(max_length=100, blank=True, null=True)
    father_last_name = models.CharField(max_length=100, blank=True, null=True)
    father_middle_name = models.CharField(max_length=100, blank=True, null=True)
    father_suffix = models.CharField(max_length=10, blank=True, null=True)
    father_age = models.CharField(max_length=10, blank=True, null=True)
    father_ethnicity = models.CharField(max_length=100, blank=True, null=True)
    father_occupation = models.CharField(max_length=100, blank=True, null=True)
    father_religion = models.CharField(max_length=100, blank=True, null=True)
    father_contact_number = models.CharField(max_length=100, blank=True, null=True)

    mother_first_name = models.CharField(max_length=100, blank=True, null=True)
    mother_last_name = models.CharField(max_length=100, blank=True, null=True)
    mother_middle_name = models.CharField(max_length=100, blank=True, null=True)
    mother_suffix = models.CharField(max_length=10, blank=True, null=True)
    mother_age = models.CharField(max_length=10, blank=True, null=True)
    mother_ethnicity = models.CharField(max_length=100, blank=True, null=True)
    mother_occupation = models.CharField(max_length=100, blank=True, null=True)
    mother_religion = models.CharField(max_length=100, blank=True, null=True)
    mother_contact_number = models.CharField(max_length=100, blank=True, null=True)

    guardian_first_name = models.CharField(max_length=100, blank=True, null=True)
    guardian_last_name = models.CharField(max_length=100, blank=True, null=True)
    guardian_middle_name = models.CharField(max_length=100, blank=True, null=True)
    guardian_suffix = models.CharField(max_length=10, blank=True, null=True)
    guardian_age = models.CharField(max_length=10, blank=True, null=True)
    guardian_ethnicity = models.CharField(max_length=100, blank=True, null=True)
    guardian_occupation = models.CharField(max_length=100, blank=True, null=True)
    guardian_religion = models.CharField(max_length=100, blank=True, null=True)
    guardian_contact_number = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        fullname = ""
        if self.first_name:
            fullname += self.first_name + " "
        if self.middle_name:
            fullname += self.middle_name + " "
        if self.last_name:
            fullname += self.last_name + " "
        if self.suffix:
            fullname += self.suffix + " "
        return fullname.strip()




# HEALTH NUTRITION =========================================================================================================

class ChildHealthInformation(models.Model):
    child = models.ForeignKey(ChildInformation, on_delete=models.CASCADE)
    date_of_weighing = models.DateField(blank=True, null=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    muac = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    bpe = models.CharField(max_length=20, blank=True, null=True)
    wfa = models.CharField(max_length=100, blank=True, null=True)
    lfa = models.CharField(max_length=100, blank=True, null=True)
    wfl = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.child}'s Health Information"