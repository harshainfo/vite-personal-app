import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'

// Mock the Body component to isolate App.tsx testing
vi.mock('./components/Body/Body', () => ({
  default: ({ selectedPage }: { selectedPage: string }) => (
    <div data-testid="body-component">Body - {selectedPage}</div>
  ),
}))

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  describe('Initial Render', () => {
    test('renders the app with default Home page selected', () => {
      render(<App />)
      
      // Check that navbar is rendered
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      
      // Check that Body component is rendered with Home page
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Home')
    })

    test('displays the app title from environment variable', () => {
      render(<App />)
      
      // Check that navbar brand displays the title from env var
      // Using the actual value from .env file
      expect(screen.getByText('Harsha Pitawela')).toBeInTheDocument()
    })

    test('renders navigation links', () => {
      render(<App />)
      
      // Check that main navigation links are present
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument()
    })

    test('renders content dropdown with menu items', () => {
      render(<App />)
      
      // Check that dropdown toggle is present
      expect(screen.getByRole('button', { name: 'Content' })).toBeInTheDocument()
    })

    test('renders search form', () => {
      render(<App />)
      
      // Check that search input and button are present
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    })
  })

  describe('Navigation via Navbar Links', () => {
    test('navigates to Home page when Home link is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Click on About Me first to change state
      await user.click(screen.getByRole('link', { name: 'About Me' }))
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - About Me')
      
      // Then click on Home
      await user.click(screen.getByRole('link', { name: 'Home' }))
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Home')
    })

    test('navigates to About Me page when About Me link is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Click on About Me link
      await user.click(screen.getByRole('link', { name: 'About Me' }))
      
      // Check that Body component receives About Me as selectedPage
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - About Me')
    })
  })

  describe('Navigation via Dropdown', () => {
    test('navigates to Videos page when Videos dropdown item is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Click on dropdown to open it
      const dropdownToggle = screen.getByRole('button', { name: 'Content' })
      await user.click(dropdownToggle)
      
      // Click on Videos item
      const videosLink = screen.getByRole('link', { name: 'Videos' })
      await user.click(videosLink)
      
      // Check that Body component receives Videos as selectedPage
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Videos')
    })

    test('navigates to Articles page when Articles dropdown item is clicked', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Click on dropdown to open it
      const dropdownToggle = screen.getByRole('button', { name: 'Content' })
      await user.click(dropdownToggle)
      
      // Click on Articles item
      const articlesLink = screen.getByRole('link', { name: 'Articles' })
      await user.click(articlesLink)
      
      // Check that Body component receives Articles as selectedPage
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Articles')
    })
  })

  describe('State Management', () => {
    test('maintains selected page state correctly across multiple navigation actions', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      // Initial state should be Home
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Home')
      
      // Navigate to About Me
      await user.click(screen.getByRole('link', { name: 'About Me' }))
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - About Me')
      
      // Navigate to Videos via dropdown
      await user.click(screen.getByRole('button', { name: 'Content' }))
      await user.click(screen.getByRole('link', { name: 'Videos' }))
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Videos')
      
      // Navigate back to Home
      await user.click(screen.getByRole('link', { name: 'Home' }))
      expect(screen.getByTestId('body-component')).toHaveTextContent('Body - Home')
    })
  })

  describe('Body Component Integration', () => {
    test('passes correct selectedPage prop to Body component', () => {
      render(<App />)
      
      // Body component should receive the initial selectedPage value
      const bodyComponent = screen.getByTestId('body-component')
      expect(bodyComponent).toHaveTextContent('Body - Home')
    })

    test('updates Body component when selectedPage changes', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const bodyComponent = screen.getByTestId('body-component')
      
      // Initial state
      expect(bodyComponent).toHaveTextContent('Body - Home')
      
      // Change to About Me
      await user.click(screen.getByRole('link', { name: 'About Me' }))
      expect(bodyComponent).toHaveTextContent('Body - About Me')
    })
  })

  describe('Search Form', () => {
    test('search input accepts text input', async () => {
      const user = userEvent.setup()
      render(<App />)
      
      const searchInput = screen.getByPlaceholderText('Search')
      await user.type(searchInput, 'test search')
      
      expect(searchInput).toHaveValue('test search')
    })

    test('search form has correct accessibility attributes', () => {
      render(<App />)
      
      const searchInput = screen.getByPlaceholderText('Search')
      expect(searchInput).toHaveAttribute('aria-label', 'Search')
      expect(searchInput).toHaveAttribute('type', 'search')
    })
  })
})