# Navbar Component

This component has been refactored to follow SOLID principles and implement appropriate design patterns.

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- **NavigationService**: Responsible only for managing navigation items
- **MenuStateService**: Responsible only for managing the UI state (mobile menu, dropdowns, dark mode, accessibility options)
- **AuthService**: Responsible only for managing authentication state
- **NavbarComponent**: Responsible only for rendering the navbar UI and coordinating between services

### Open/Closed Principle (OCP)
- The navigation system is open for extension (new items can be added) but closed for modification
- New authentication methods can be added without modifying existing code
- Accessibility features can be extended without changing existing code

### Liskov Substitution Principle (LSP)
- Services use interfaces and models that can be substituted with different implementations
- The component depends on abstractions rather than concrete implementations

### Interface Segregation Principle (ISP)
- Each service has a focused API that only exposes what's needed
- NavigationItem interface is focused on navigation-specific properties
- AuthState interface is focused on authentication-specific properties
- MenuState interface is focused on UI state properties

### Dependency Inversion Principle (DIP)
- The component depends on abstractions (services) rather than concrete implementations
- Services are injected into the component, allowing for easy testing and substitution

## Design Patterns Applied

### Observer Pattern
- RxJS Observables are used to notify subscribers of state changes
- MenuStateService uses BehaviorSubject to manage and broadcast UI state changes
- AuthService uses BehaviorSubject to manage and broadcast authentication state changes

### Service Pattern
- Core functionality is encapsulated in injectable services
- Services are registered as singletons in the CoreModule

### Module Pattern
- CoreModule organizes and provides services
- Prevents multiple imports of singleton services

### Strategy Pattern
- Different strategies for handling different aspects of the UI (dark mode, language, accessibility)
- Each strategy is encapsulated in its own method in the MenuStateService

## Enhanced Features

### Accessibility Features
- **Large Font Toggle**: Increases font size for better readability
- **High Contrast Mode**: Enhances visibility for users with visual impairments
- Both features are implemented using CSS classes and variables for consistent application

### Enhanced Animations
- **Dropdown Animations**: Smooth transitions for dropdown menus
- **Mobile Menu Animations**: Slide-in animation for mobile menu
- Animations are implemented using CSS transitions and classes

## Benefits of This Approach

1. **Maintainability**: Each class has a single responsibility, making the code easier to understand and maintain
2. **Testability**: Dependencies are injected, making it easier to mock services for testing
3. **Extensibility**: New features can be added without modifying existing code
4. **Reusability**: Services can be reused across the application
5. **Scalability**: The application can grow without becoming unwieldy
6. **Accessibility**: The component is accessible to users with different needs
7. **User Experience**: Enhanced animations improve the user experience

## Usage

The navbar component now uses the following services:

- **NavigationService**: To get navigation items
- **MenuStateService**: To manage the UI state (mobile menu, dropdowns, dark mode, accessibility options)
- **AuthService**: To manage authentication state

These services should be provided in the CoreModule, which should be imported only once in the AppModule.

## Testing

The component includes comprehensive tests for all functionality:
- Navigation item retrieval
- Mobile menu toggling
- Dropdown toggling
- Dark mode toggling
- Language toggling
- Accessibility feature toggling
- Notifications toggling
- User profile toggling
- Authentication actions
