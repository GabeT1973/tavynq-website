import { Route, Routes } from "react-router-dom"
import { SiteLayout } from "@/components/site-layout"
import { Home } from "@/pages/home"
import { PrivacyPolicy } from "@/pages/privacy-policy"
import { TermsOfService } from "@/pages/terms-of-service"

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </SiteLayout>
  )
}

export default App
