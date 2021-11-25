import React , {useState, useEffect} from "react"
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import sandbox from "./sandbox";
function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [renderedContent, setRenderedContent] = useState('')
  useEffect(()=>{

    const timeout = setTimeout(()=>{
      setRenderedContent(`
      <html>
      <style>${css}</style>
      <body>${html}</body>
      <script>${js}</script>
      </html>
      `)
    }, 250)

    return ()=> clearTimeout(timeout)
  }, [html, css, js])


  return (
    <>

    <div className="window top-window">
     
      <Editor language="xml" languageName="HTML" 
      value={html} 
      onChange={setHtml}
      />

    <Editor language="css" languageName="CSS" 
      value={css} 
      onChange={setCss}
      />  

    <Editor language="javascript" languageName="JS" 
      value={js} 
      onChange={setJs}
      />

    </div>
    <div className="window">
      <iframe 
      srcDoc={renderedContent}
      title="output"
      sandbox={sandbox}
      frameBorder="0"
      width="100%"
      height="100%"
      loading="lazy"
      />

    </div>
    </>
  )
}

export default App;
