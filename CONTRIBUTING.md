# Contributing to IDJINKOUNDZI NEWS

Thank you for your interest in contributing to IDJINKOUNDZI NEWS! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Exercise empathy and kindness
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show courtesy and respect to other community members

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- npm or yarn
- Git
- Basic knowledge of React Native and TypeScript
- Familiarity with Expo

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/IDJI_NEWS.git
cd IDJI_NEWS
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/youssoufsoroda/IDJI_NEWS.git
```

4. Install dependencies:
```bash
npm install
```

5. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

6. Start development server:
```bash
npm start
```

## Development Workflow

### Branch Naming

Create a branch for your work:

```bash
git checkout -b feature/your-feature-name
git checkout -b fix/bug-description
git checkout -b docs/documentation-update
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid using `any` type
- Use meaningful variable and function names

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (userId: string): Promise<User> => {
  // Implementation
};
```

### React/React Native

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use custom hooks for reusable logic

```typescript
const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
```

### File Structure

```
ComponentName/
├── index.tsx           # Main component
├── styles.ts          # Styles (if complex)
└── types.ts           # Component types (if complex)
```

### Styling

- Use StyleSheet.create() for styles
- Follow the existing design system
- Use theme colors from config/theme.ts
- Maintain consistent spacing

```typescript
const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
});
```

### Comments

- Write self-documenting code
- Add comments for complex logic
- Document public APIs
- Use JSDoc for functions

```typescript
/**
 * Fetches news articles from the API
 * @param serviceId - Optional service ID to filter by
 * @returns Promise resolving to array of news items
 */
const fetchNews = async (serviceId?: string): Promise<News[]> => {
  // Implementation
};
```

### Imports

Organize imports in this order:
1. React/React Native
2. Third-party libraries
3. Local components
4. Types
5. Utils/Helpers
6. Styles

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/Button';
import { User } from '@/types';
import { formatDate } from '@/utils/date';
import { styles } from './styles';
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(news): add filtering by event type

Implement filtering functionality in the news feed to allow users
to filter news articles by event type (Grand mariage, Mdhoihiricho, etc.)

Closes #123
```

```
fix(auth): resolve login error on Android

Fix authentication error that occurred when users tried to login
on Android devices running version 13+

Fixes #456
```

### Writing Good Commits

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep first line under 72 characters
- Reference issues and pull requests when relevant

## Pull Request Process

### Before Submitting

1. Update your branch with latest main:
```bash
git fetch upstream
git rebase upstream/main
```

2. Test your changes thoroughly:
```bash
npm start
# Test on iOS and Android if possible
```

3. Ensure code follows style guidelines

4. Update documentation if needed

### Submitting a Pull Request

1. Push to your fork:
```bash
git push origin feature/your-feature-name
```

2. Create a pull request from your fork to the main repository

3. Fill out the PR template completely:
   - Clear description of changes
   - Link related issues
   - Add screenshots/videos if UI changes
   - List any breaking changes

4. Request review from maintainers

### PR Title Format

```
[Type] Brief description of changes
```

Examples:
- `[Feature] Add news filtering by category`
- `[Fix] Resolve authentication error on Android`
- `[Docs] Update deployment guide`

### Review Process

- At least one approval required from maintainers
- All CI checks must pass
- Address all review comments
- Keep PR focused and reasonably sized
- Be responsive to feedback

## Reporting Bugs

### Before Reporting

- Check existing issues to avoid duplicates
- Test on latest version
- Verify it's reproducible

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Device: [e.g. Pixel 6]
- OS: [e.g. Android 13]
- App Version: [e.g. 1.0.0]

**Additional Context**
Any other relevant information
```

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired functionality

**Describe alternatives you've considered**
Other approaches you've thought about

**Additional context**
Mockups, examples, etc.
```

## Questions?

- Open a discussion in the repository
- Email: contact@idjinkoundzi.com

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to IDJINKOUNDZI NEWS! 🎉
