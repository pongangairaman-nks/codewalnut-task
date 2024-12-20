# Timer App Assignment

Welcome to the Timer App Assignment! This project mainly focuses on **UI implementation**, **code quality**, **state management**, and **best practices**. The project uses **React**, **Vite**, **Tailwind CSS**, and **Vitest** for testing.

---

## **Objective**

The objective was to enhance and extend the functionality of the existing Timer App by implementing the following features:

- Allow multiple timers to run simultaneously.
- Improve snack bar behavior and error handling.
- Refactor modal components for reusability and eliminate duplication.
- Implement timer persistence with `localStorage`.
- Write unit and component tests for the app.

---

## **Tech Stack**

- **Frontend Framework**: React (with Vite for fast development)
- **Styling**: Tailwind CSS
- **Testing Framework**: Vitest (for unit and component testing)

---

## **Completed Features**

### 1. **Match the UI**

- **Task Completed**: The app is now aligned with the provided screenshots, ensuring consistency in layout, buttons, input fields, modals, and snack bars.

### 2. **Simultaneous Timers**

- **Task Completed**: The app now supports multiple timers running simultaneously. Each timer operates independently, with its own start, stop, and reset functionalities.

### 3. **Snack Bar Behavior**

- **Task Completed**: When a timer completes, a snack bar notification is displayed. The notification sound continues to play until the snack bar is dismissed, ensuring the user is notified of timer completion.

### 4. **Fix Snack Bar Console Error**

- **Task Completed**: Resolved the console error that occurred when the dismiss button on the snack bar was clicked. This was fixed by ensuring proper state management during the dismiss action.

### 5. **Extract Common Components**

- **Task Completed**: The buttons in the Add/Edit Timer Modal and Timer List were extracted into a reusable component (`Button`). This reduces code duplication and improves maintainability.

### 6. **Consolidate Modal Code**

- **Task Completed**: Refactored the code to use a single modal component for both adding and editing timers, eliminating code duplication and simplifying the app structure.

### 7. **Validation Snack Bars**

- **Task Completed**: When the form is submitted with invalid data, an error snack bar is displayed to inform the user, instead of just disabling the submit button.

### 8. **Responsive Snack Bar Placement**

- **Task Completed**: The snack bar now displays in the top-right corner for desktop devices and at the bottom of the screen for mobile devices, ensuring a responsive design.

### 9. **Write Tests**

- **Task Completed**: Added unit tests for the validation logic to ensure that all validation rules are functioning correctly. Component tests were also written for reusable components like `TimerItem` and `Button`.

### 10. **Timer Persistence**

- **Task Completed**: Implemented localStorage to persist timers across page refreshes, ensuring that the timers remain intact even after a browser refresh.

---

## **Project Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/pongangairaman-nks/codewalnut-task.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npx vitest
   ```

---
