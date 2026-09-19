import { Route, Routes } from "react-router-dom"
import { SiteLayout } from "@/components/site-layout"
import { Home } from "@/pages/home"
import { Privacy } from "@/pages/privacy"
import { Terms } from "@/pages/terms"
import { Contact } from "@/pages/contact"
import { CancellationPolicy } from "@/pages/cancellation-policy"

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />
      </Routes>
    </SiteLayout>
  )
}

export default App
