class Student:
    def __init__(self, name, student_id, grades=None):
        self.name = name
        self.student_id = student_id
        self.grades = grades or {}
    
    def add_grade(self, course, grade):
        self.grades[course] = grade
    
    def get_average(self):
        if not self.grades:
            return 0
        return sum(self.grades.values()) / len(self.grades)
    
    def __str__(self):
        return f"Student(name={self.name}, id={self.student_id}, avg={self.get_average():.2f})"

class Course:
    def __init__(self, name, code):
        self.name = name
        self.code = code
        self.students = []
    
    def add_student(self, student):
        self.students.append(student)
    
    def get_average_grade(self):
        if not self.students:
            return 0
        total = sum(student.grades.get(self.name, 0) for student in self.students)
        return total / len(self.students)
    
    def __str__(self):
        return f"Course(name={self.name}, code={self.code}, students={len(self.students)})"

def main():
    # Create some students
    alice = Student("Alice Smith", "S12345")
    bob = Student("Bob Johnson", "S67890")
    charlie = Student("Charlie Brown", "S24680")
    
    # Create some courses
    math = Course("Mathematics", "MATH101")
    programming = Course("Programming", "CS150")
    
    # Add students to courses
    math.add_student(alice)
    math.add_student(bob)
    programming.add_student(alice)
    programming.add_student(charlie)
    
    # Add grades
    alice.add_grade("Mathematics", 85)
    alice.add_grade("Programming", 92)
    bob.add_grade("Mathematics", 78)
    charlie.add_grade("Programming", 88)
    
    # Print info
    print("Students:")
    for student in [alice, bob, charlie]:
        print(f"- {student}")
    
    print("\nCourses:")
    for course in [math, programming]:
        print(f"- {course}")
        print(f"  Average Grade: {course.get_average_grade():.2f}")
        print(f"  Enrolled Students: {[s.name for s in course.students]}")

if __name__ == "__main__":
    main()