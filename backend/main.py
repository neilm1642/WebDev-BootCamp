from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI()


# ---------- Pydantic models ----------

class ProjectIn(BaseModel):
    """Data the client sends when creating or updating a project."""
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=500)
    tech_stack: list[str] = Field(default_factory=list)
    github_url: str | None = None


class Project(ProjectIn):
    """A project as stored in our in-memory database (includes an id)."""
    id: int


# ---------- In-memory "database" ----------

projects: list[Project] = [
    Project(
        id=1,
        title="Personal Portfolio",
        description="My portfolio website built with React, TypeScript, and Vite.",
        tech_stack=["React", "TypeScript", "Vite"],
        github_url="https://github.com/neilm1642/WebDev-BootCamp",
    ),
    Project(
        id=2,
        title="Weather Dashboard",
        description="A dashboard that shows the current weather and a 5-day forecast.",
        tech_stack=["JavaScript", "HTML", "CSS"],
    ),
    Project(
        id=3,
        title="Task Tracker API",
        description="A simple REST API for creating and completing tasks.",
        tech_stack=["Python", "FastAPI"],
    ),
]


# ---------- Endpoints ----------

@app.get("/projects")
def get_projects() -> list[Project]:
    """Return every project in the portfolio."""
    return projects


@app.post("/projects", status_code=201)
def create_project(project_in: ProjectIn) -> Project:
    """Add a new project and return it with its new id."""
    new_id = max((p.id for p in projects), default=0) + 1
    new_project = Project(id=new_id, **project_in.model_dump())
    projects.append(new_project)
    return new_project


@app.put("/projects/{project_id}")
def update_project(project_id: int, project_in: ProjectIn) -> Project:
    """Replace an existing project's details. Returns 404 if it doesn't exist."""
    for index, project in enumerate(projects):
        if project.id == project_id:
            updated_project = Project(id=project_id, **project_in.model_dump())
            projects[index] = updated_project
            return updated_project
    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")
