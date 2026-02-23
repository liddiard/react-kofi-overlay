import { Donate } from '../../src'

export default function App() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: '#f5f5f5',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>react-kofi-overlay</h1>
      <p style={{ margin: 0, color: '#555' }}>
        Click the button below to open the Ko-fi donation panel.
      </p>
      <Donate
        username="liddiard"
        onToggle={(open) => {
          console.log(`Donate panel ${open ? 'opened' : 'closed'}`)
        }}
        styles={{
          donateBtn: {
            fontSize: '1.4rem',
            fontFamily: 'system-ui',
            cursor: 'pointer',
          },
        }}
      >
        ❤️ Support Me
      </Donate>
    </div>
  )
}
