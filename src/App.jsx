import { useState } from 'react'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import EraIndicator from './components/EraIndicator'
import Modal from './components/Modal'
import AudioManager from './components/AudioManager'
import './App.css'

function App() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="app">
      <Hero />
      <Timeline onItemClick={handleItemClick} />
      <EraIndicator />
      <Modal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <AudioManager />
    </div>
  )
}

export default App
