import { useState } from 'react'
import './App.css'

type Project = { id: string; title: string; category: string; description: string; tags: string[]; symbol: string; color: string; href?: string }
const projects: Project[] = [
  { id: 'portfolio', title: 'Personal Portfolio', category: 'Web development', description: 'A home for my projects and interests, built while learning React with the App Dev Club.', tags: ['React', 'TypeScript', 'CSS'], symbol: '</>', color: 'lavender', href: 'https://github.com/neilm1642/WebDev-BootCamp' },
  { id: 'robotics', title: 'FTC Robotics', category: 'Robotics', description: 'Collaborating on competition robots, solving design challenges, and learning through iteration. FTC World Championship winner, 2022–2023.', tags: ['Engineering', 'Teamwork', 'Robotics'], symbol: '⚙', color: 'peach' },
  { id: 'java', title: 'Java Coursework', category: 'Computer science', description: 'Building my programming foundations through object-oriented design, linked lists, recursion, and generics.', tags: ['Java', 'Data structures', 'OOP'], symbol: '{ }', color: 'sage' },
]

function ProjectCard({ project, saved, onToggleSave }: { project: Project; saved: boolean; onToggleSave: (id: string) => void }) {
  return <article className="project-card">
    <div className={`project-art ${project.color}`} aria-hidden="true"><span>{project.symbol}</span><small>{project.category}</small></div>
    <div className="card-body"><p className="eyebrow">{project.category}</p><h3>{project.title}</h3><p className="description">{project.description}</p>
      <ul className="tags" aria-label={`${project.title} topics`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div className="card-actions">{project.href ? <a href={project.href} target="_blank" rel="noreferrer">View code ↗</a> : <span>{project.id === 'robotics' ? 'Team experience' : 'Learning in progress'}</span>}
        <button type="button" className={saved ? 'saved' : ''} aria-pressed={saved} aria-label={`${saved ? 'Unsave' : 'Save'} ${project.title}`} onClick={() => onToggleSave(project.id)}>{saved ? '★ Saved' : '☆ Save'}</button>
      </div>
    </div>
  </article>
}
function ProjectGrid({ items, savedIds, onToggleSave }: { items: Project[]; savedIds: string[]; onToggleSave: (id: string) => void }) {
  return <div className="project-grid">{items.map(project => <ProjectCard key={project.id} project={project} saved={savedIds.includes(project.id)} onToggleSave={onToggleSave} />)}</div>
}

function App() {
  const [query, setQuery] = useState('')
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [showSaved, setShowSaved] = useState(false)
  function toggleSave(id: string) {
    setSavedIds(current => current.includes(id) ? current.filter(savedId => savedId !== id) : [...current, id])
  }
  const visibleProjects = projects.filter(project => [project.title, project.category, project.description, ...project.tags].join(' ').toLowerCase().includes(query.trim().toLowerCase()) && (!showSaved || savedIds.includes(project.id)))
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#main" aria-label="Neil home">neil<span>.</span></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact ↗</a></nav></header>
    <main id="main">
      <section className="hero" aria-labelledby="intro-title"><p className="eyebrow"><span className="status-dot" /> COMPUTER SCIENCE @ UNIVERSITY OF MARYLAND</p><h1 id="intro-title">Hey, I'm Neil.<br /><span>I like building things.</span></h1><p className="hero-description">From competition robots to my first web apps, I enjoy figuring out how things work and making them better.</p><a className="primary-link" href="#projects">Explore my work ↓</a><div className="hero-footer"><span>Software · AI · Robotics</span><span>Always learning, always iterating.</span></div></section>
      <section id="about" className="about-section" aria-labelledby="about-title"><div><p className="eyebrow">A LITTLE ABOUT ME</p><h2 id="about-title">Curiosity comes first.</h2></div><div><p>I'm a Computer Science student at UMD with a background in competitive robotics. I’m interested in software engineering, AI, and technology that helps people.</p><p>I love the process of building with a team: trying an idea, learning what went wrong, and coming back with something better.</p></div></section>
      <section id="projects" className="projects-section" aria-labelledby="projects-title"><div className="section-heading"><div><p className="eyebrow">THINGS I'VE BEEN WORKING ON</p><h2 id="projects-title">Projects & experience<span>.</span></h2></div><span className="section-number">01 — 03</span></div>
        <div className="project-toolbar"><div className="filters" role="group" aria-label="Project filters"><button type="button" className={!showSaved ? 'active' : ''} aria-pressed={!showSaved} onClick={() => setShowSaved(false)}>All projects <span>{projects.length}</span></button><button type="button" className={showSaved ? 'active' : ''} aria-pressed={showSaved} onClick={() => setShowSaved(true)}>Saved <span>{savedIds.length}</span></button></div><div className="search-field"><label className="sr-only" htmlFor="project-search">Search projects</label><span aria-hidden="true">⌕</span><input id="project-search" type="search" placeholder="Search projects…" value={query} onChange={event => setQuery(event.target.value)} /></div></div>
        <p className="sr-only" role="status">{visibleProjects.length} projects shown. {savedIds.length} saved.</p><ProjectGrid items={visibleProjects} savedIds={savedIds} onToggleSave={toggleSave} />
        {visibleProjects.length === 0 && <div className="empty-state"><h3>{showSaved && savedIds.length === 0 ? 'Your collection starts here.' : 'No matching projects.'}</h3><p>{showSaved && savedIds.length === 0 ? 'Use the Save button on a project to keep it in this view.' : 'Try another search or reset the filters.'}</p><button type="button" onClick={() => { setQuery(''); setShowSaved(false) }}>Show all projects</button></div>}
      </section>
      <section id="contact" className="contact-section" aria-labelledby="contact-title"><p className="eyebrow">LET'S CONNECT</p><h2 id="contact-title">Have something in mind?</h2><p>I'm always up for talking about code, robots, or a new idea.</p><a className="primary-link" href="https://github.com/neilm1642" target="_blank" rel="noreferrer">Find me on GitHub ↗</a></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#main">neil<span>.</span></a><span>Built with React. Made to keep growing.</span><a href="#main">Back to top ↑</a></footer>
  </>
}
export default App
