import tkinter as tk
from tkinter import font

class ToDoListApp:
    def __init__(self, root):
        self.root = root
        self.root.title("To-Do List")
        self.root.geometry("1000x600")
        self.root.configure(bg="#E0F2F1")  # Light teal background

        self.tasks = {
            "Task": [],
            "Completed": [],
            "Deleted": []
        }

        self.create_widgets()

    def create_widgets(self):
        # Main frame
        main_frame = tk.Frame(self.root, bg="#FFFFFF", bd=5, relief=tk.RAISED)
        main_frame.pack(fill=tk.BOTH, expand=1, padx=20, pady=20)

        # Sidebar
        sidebar_width = 300  # Width for the sidebar
        sidebar = tk.Frame(main_frame, bg="#00796B")  # Darker teal
        sidebar.pack(side=tk.LEFT, fill=tk.Y)
        sidebar.pack_propagate(False)  # Prevent sidebar from resizing
        sidebar.config(width=sidebar_width)  # Set the width of the sidebar

        # Adding some padding at the top
        tk.Label(sidebar, bg="#00796B").pack(pady=20)

        title_font = font.Font(family="Helvetica", size=24, weight="bold")
        title_label = tk.Label(sidebar, text="To-Do List", fg="#FFFFFF", bg="#00796B", font=title_font)
        title_label.pack(pady=20)

        categories = ["Task", "Completed", "Deleted"]
        for category in categories:
            cat_btn = tk.Button(sidebar, text=category, fg="#FFFFFF", bg="#004D40", font=("Helvetica", 16), bd=0,
                                command=lambda c=category: self.show_tasks(c),
                                activebackground="#00332A", activeforeground="#FFFFFF")
            cat_btn.pack(fill=tk.X, padx=20, pady=10)

        # Main content area
        content_frame = tk.Frame(main_frame, bg="#E0F2F1")  # Light teal background
        content_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=1)

        # Header
        header_font = font.Font(family="Helvetica", size=26, weight="bold")
        self.header_label = tk.Label(content_frame, text="Task", font=header_font, bg="#E0F2F1", fg="#00796B")
        self.header_label.pack(side=tk.TOP, padx=20, pady=10, anchor="w")

        # Tasks Frame
        self.tasks_frame = tk.Frame(content_frame, bg="#E0F2F1")
        self.tasks_frame.pack(fill=tk.BOTH, expand=1)

        self.create_task_section("Task")

    def create_task_section(self, category):
        for widget in self.tasks_frame.winfo_children():
            widget.destroy()

        self.header_label.config(text=category)

        section_frame = tk.Frame(self.tasks_frame, bg="#E0F2F1")
        section_frame.pack(fill=tk.BOTH, expand=1)

        tasks_list_frame = tk.Frame(section_frame, bg="#E0F2F1")
        tasks_list_frame.pack(fill=tk.BOTH, expand=1)

        for task in self.tasks[category]:
            task_frame = tk.Frame(tasks_list_frame, bg="#E0F2F1")
            task_frame.pack(fill=tk.X, padx=20, pady=5)

            if category == "Deleted":
                task_label = tk.Label(task_frame, text=task, bg="#E0F2F1", font=("Helvetica", 12), fg="#9E9E9E")
                task_label.pack(side=tk.LEFT, padx=(0, 10))
            elif category == "Completed":
                task_label = tk.Label(task_frame, text=task, bg="#E0F2F1", font=("Helvetica", 12), fg="#9E9E9E")
                task_label.pack(side=tk.LEFT, padx=(0, 10))
                
                # Only in Completed section, no checkbox
                delete_button = tk.Button(task_frame, text="Delete", command=lambda t=task: self.delete_task(t, "Completed"),
                                          bg="#FF5722", fg="#FFFFFF", font=("Helvetica", 10),
                                          activebackground="#E64A19", activeforeground="#FFFFFF")
                delete_button.pack(side=tk.LEFT)
            else:  # For "Task" category
                var = tk.IntVar()
                checkbox = tk.Checkbutton(task_frame, text=task, variable=var, bg="#E0F2F1", font=("Helvetica", 12),
                                          onvalue=1, offvalue=0, command=lambda t=task, v=var: self.complete_task(t, v),
                                          activebackground="#004D40", activeforeground="#FFFFFF",
                                          selectcolor="#E0F2F1", highlightthickness=0)
                checkbox.pack(side=tk.LEFT, padx=(0, 10))

                delete_button = tk.Button(task_frame, text="Delete", command=lambda t=task: self.delete_task(t, "Task"),
                                          bg="#FF5722", fg="#FFFFFF", font=("Helvetica", 10),
                                          activebackground="#E64A19", activeforeground="#FFFFFF")
                delete_button.pack(side=tk.LEFT)

        # Create a new task entry in the center
        add_task_frame = tk.Frame(section_frame, bg="#E0F2F1")
        add_task_frame.pack(pady=10, fill=tk.X)

        self.add_task_entry = tk.Entry(add_task_frame, font=("Helvetica", 12), bd=2, relief="solid",
                                       bg="#FFFFFF", fg="#333")
        self.add_task_entry.pack(fill=tk.X, padx=20, pady=5)

        add_task_button = tk.Button(add_task_frame, text="Add Task", command=lambda: self.add_task(category),
                                    bg="#00796B", fg="#FFFFFF", font=("Helvetica", 12),
                                    activebackground="#004D40", activeforeground="#FFFFFF")
        add_task_button.pack(pady=5)

    def show_tasks(self, category):
        if category in self.tasks:
            self.create_task_section(category)

    def add_task(self, category):
        task = self.add_task_entry.get().strip()
        if task:
            self.tasks[category].append(task)
            self.create_task_section(category)  # Refresh the task section
            self.add_task_entry.delete(0, tk.END)  # Clear the entry

    def complete_task(self, task, var):
        if var.get() == 1:  # Checkbox checked
            self.tasks["Completed"].append(task)
            self.tasks["Task"].remove(task)
            self.create_task_section("Task")  # Refresh the task section
            self.create_task_section("Completed")  # Refresh the completed section

    def delete_task(self, task, category):
        self.tasks["Deleted"].append(task)
        self.tasks[category].remove(task)
        self.create_task_section(category)  # Refresh the task section
        self.create_task_section("Deleted")  # Refresh the deleted section

if __name__ == "__main__":
    root = tk.Tk()
    app = ToDoListApp(root)
    root.mainloop()
