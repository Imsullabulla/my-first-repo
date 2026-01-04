# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Add, Edit, and Delete Expenses**: Complete CRUD functionality for managing your expenses
- **Smart Filtering**: Search by description, filter by category, date range, and sort by multiple criteria
- **Analytics Dashboard**: Visual insights with pie charts, trend lines, and monthly bar charts
- **Category Management**: 6 predefined categories (Food, Transportation, Entertainment, Shopping, Bills, Other)
- **Dark Mode**: Beautiful dark theme with accent colors for better viewing experience
- **Data Persistence**: All expenses are saved in browser localStorage
- **CSV Export**: Export your expenses for external analysis
- **Form Validation**: Comprehensive validation with helpful error messages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-first-repo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Adding Expenses

1. Fill in the expense form at the top of the page:
   - **Amount**: Enter the expense amount (positive number, max 2 decimals)
   - **Category**: Select from 6 categories
   - **Date**: Choose the expense date (cannot be in the future)
   - **Description**: Brief description (3-200 characters)
2. Click "Add Expense" to save

### Editing Expenses

1. Click the pencil icon on any expense card
2. Modify the details in the modal dialog
3. Click "Update Expense" to save changes

### Deleting Expenses

1. Click the trash icon on any expense card
2. Confirm the deletion in the dialog

### Filtering & Searching

- **Search**: Type keywords to filter by description
- **Category**: Select a specific category or "All Categories"
- **Date Range**: Set start and/or end dates to filter
- **Sort**: Choose sorting criteria (date, amount, category) and order (asc/desc)
- **Clear All**: Reset all filters at once

### Exporting Data

1. Click the "Export CSV" button in the header
2. A CSV file will download with all your expenses
3. Open in Excel, Google Sheets, or any spreadsheet software

### Dark Mode

- Click the sun/moon icon in the header to toggle themes
- Your preference is saved and persists across sessions

## Project Structure

```
my-first-repo/
├── app/                        # Next.js app directory
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main dashboard page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── DatePicker.tsx
│   │   └── Modal.tsx
│   ├── expenses/              # Expense-specific components
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── ExpenseItem.tsx
│   │   ├── ExpenseFilters.tsx
│   │   └── ExpenseStats.tsx
│   ├── dashboard/             # Analytics components
│   │   ├── CategoryChart.tsx
│   │   ├── TrendChart.tsx
│   │   ├── MonthlyChart.tsx
│   │   └── DashboardCharts.tsx
│   └── layout/                # Layout components
│       ├── Header.tsx
│       └── ThemeToggle.tsx
├── hooks/                      # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useExpenses.ts
│   ├── useFilters.ts
│   └── useTheme.ts
├── lib/                        # Utilities and helpers
│   ├── types.ts               # TypeScript definitions
│   ├── constants.ts           # App constants
│   ├── storage.ts             # localStorage utilities
│   ├── validation.ts          # Form validation
│   ├── formatting.ts          # Data formatting
│   ├── calculations.ts        # Analytics calculations
│   ├── export.ts              # CSV export
│   └── utils.ts               # General utilities
└── package.json
```

## Data Model

```typescript
interface Expense {
  id: string;              // Unique identifier (UUID)
  date: string;            // ISO date string
  amount: number;          // Expense amount
  category: Category;      // One of 6 categories
  description: string;     // User description
  createdAt: string;       // Creation timestamp
  updatedAt: string;       // Last update timestamp
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment

This app can be deployed to:

- **Vercel** (recommended): Connect your GitHub repo for automatic deployments
- **Netlify**: Deploy with a single click
- **Any static hosting**: Build and deploy the `.next` folder

## Known Limitations

- Data is stored in browser localStorage (max ~5-10MB)
- No user authentication or multi-user support
- No cloud sync across devices
- No recurring expense automation

## Future Enhancements

- Cloud storage integration (Firebase/Supabase)
- User authentication
- Multi-currency support
- Receipt image uploads
- Budget limits and alerts
- Recurring expenses
- PWA support for offline usage
- Export to PDF

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript
