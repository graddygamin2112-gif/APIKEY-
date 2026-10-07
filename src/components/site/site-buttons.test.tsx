import { useState, type ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';

import { Button } from '@/components/ui/button';
import { BillingToggle } from './BillingToggle';
import { PricingCard } from './PricingCard';
import { CtaBand } from './CtaBand';
import { EditorMockup } from './EditorMockup';
import { DownloadButton, DownloadProvider } from './DownloadDialog';
import { plans } from '@/data/pricing';
import { features, FEATURE_CATEGORIES, type FeatureCategory } from '@/data/features';
import { testimonials, testimonialTags, type TestimonialTag } from '@/data/testimonials';
import { tutorials, tutorialCategories, type TutorialCategory } from '@/data/tutorials';

/**
 * Button + interactive-control functionality tests for the CutForge marketing
 * site. Everything renders inside TestApp so all providers are available;
 * DownloadProvider is added on top because TestApp omits it.
 */
function renderSite(ui: ReactNode) {
  return render(
    <TestApp>
      <DownloadProvider>{ui}</DownloadProvider>
    </TestApp>,
  );
}

describe('Button primitive', () => {
  it('renders as a <button> by default and forwards props', () => {
    const onClick = vi.fn();
    renderSite(<Button onClick={onClick}>Click me</Button>);

    const btn = screen.getByRole('button', { name: 'Click me' });
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('data-slot', 'button');

    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes the variant and size as data attributes', () => {
    renderSite(
      <Button variant="outline" size="lg">
        Outline
      </Button>,
    );

    const btn = screen.getByRole('button', { name: 'Outline' });
    expect(btn).toHaveAttribute('data-variant', 'outline');
    expect(btn).toHaveAttribute('data-size', 'lg');
  });

  it('renders its child as the root element when asChild is set', () => {
    renderSite(
      <Button asChild>
        <a href="https://example.com">Link button</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Link button' });
    expect(link.tagName).toBe('A');
    // Slot merges onto the child; no nested <button> should remain.
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('does not fire handlers when disabled', () => {
    const onClick = vi.fn();
    renderSite(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('DownloadDialog controls', () => {
  const dialogTitle = 'Download CutForge Studio';

  /** The explicit "Close" Button, as opposed to the dialog's built-in X icon. */
  function getExplicitCloseButton() {
    const btn = screen
      .getAllByRole('button', { name: 'Close' })
      .find((b) => b.getAttribute('data-slot') === 'button');
    expect(btn).toBeDefined();
    return btn as HTMLButtonElement;
  }

  /** The form that wraps the download submission. */
  function getDownloadForm() {
    const submit = screen.getByRole('button', { name: /Download for macOS/ });
    const form = submit.closest('form');
    expect(form).not.toBeNull();
    return form as HTMLFormElement;
  }

  it('opens the dialog when a DownloadButton is clicked', () => {
    renderSite(<DownloadButton>Download free</DownloadButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Download free' }));

    expect(screen.getByRole('heading', { name: dialogTitle })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download for macOS/ })).toBeInTheDocument();
  });

  it('switches the platform when a platform option is selected', () => {
    renderSite(<DownloadButton>Download free</DownloadButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Download free' }));
    fireEvent.click(screen.getByRole('button', { name: /Windows 10 & 11/ }));

    expect(screen.getByRole('button', { name: /Download for Windows/ })).toBeInTheDocument();
  });

  it('shows the confirmation state after submitting the form', () => {
    renderSite(<DownloadButton>Download free</DownloadButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Download free' }));
    fireEvent.submit(getDownloadForm());

    expect(screen.getByRole('heading', { name: 'You\u2019re all set' })).toBeInTheDocument();
  });

  it('closes the dialog from the success state', () => {
    renderSite(<DownloadButton>Download free</DownloadButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Download free' }));
    fireEvent.submit(getDownloadForm());
    fireEvent.click(getExplicitCloseButton());

    expect(screen.queryByRole('heading', { name: dialogTitle })).toBeNull();
  });

  it('throws a helpful error when used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<DownloadButton>Download free</DownloadButton>)).toThrow(
      /must be used within DownloadProvider/,
    );
    spy.mockRestore();
  });
});

describe('BillingToggle', () => {
  it('reflects the annual state via aria-pressed', () => {
    renderSite(<BillingToggle annual={true} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Annual' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Monthly' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with false when Monthly is clicked', () => {
    const onChange = vi.fn();
    renderSite(<BillingToggle annual={true} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('calls onChange with true when Annual is clicked', () => {
    const onChange = vi.fn();
    renderSite(<BillingToggle annual={false} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Annual' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('PricingCard CTA', () => {
  it('opens the download dialog when the CTA is clicked', () => {
    const plan = plans[1]; // Creator (featured)
    renderSite(<PricingCard plan={plan} annual={true} />);

    fireEvent.click(screen.getByRole('button', { name: plan.cta }));
    expect(screen.getByRole('heading', { name: 'Download CutForge Studio' })).toBeInTheDocument();
  });

  it('renders the annual savings line for paid plans on annual billing', () => {
    renderSite(<PricingCard plan={plans[1]} annual={true} />);
    // (29 - 23) * 12 = 72
    expect(screen.getByText(/Save \$72\/year/)).toBeInTheDocument();
  });

  it('labels the free plan "forever" instead of a billing cycle', () => {
    renderSite(<PricingCard plan={plans[0]} annual={true} />);
    expect(screen.getByText('forever')).toBeInTheDocument();
  });
});

describe('CtaBand', () => {
  it('opens the download dialog from the primary CTA', () => {
    renderSite(<CtaBand />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Download free' })[0]);

    expect(screen.getByRole('heading', { name: 'Download CutForge Studio' })).toBeInTheDocument();
  });

  it('links to pricing', () => {
    renderSite(<CtaBand />);
    expect(screen.getByRole('link', { name: 'Compare plans' })).toHaveAttribute('href', '/pricing');
  });
});

describe('EditorMockup transport', () => {
  it('toggles playback when the play/pause button is clicked', () => {
    renderSite(<EditorMockup />);

    fireEvent.click(screen.getByRole('button', { name: 'Pause preview' }));
    expect(screen.getByRole('button', { name: 'Play preview' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Play preview' }));
    expect(screen.getByRole('button', { name: 'Pause preview' })).toBeInTheDocument();
  });
});

describe('Filter controls', () => {
  it('filters features by category when a chip is clicked', () => {
    renderSite(<FeatureExplorer />);

    expect(screen.getByText(features[0].title)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Delivery' }));

    // timeline-engine is Performance-only, so it must disappear.
    expect(screen.queryByText(features[0].title)).toBeNull();
    expect(screen.getByText(features[8].title)).toBeInTheDocument();
  });

  it('filters testimonials by tag', () => {
    renderSite(<TestimonialExplorer />);

    fireEvent.click(screen.getByRole('button', { name: 'Sports' }));

    expect(screen.getByText(testimonials[3].name)).toBeInTheDocument();
    expect(screen.queryByText(testimonials[0].name)).toBeNull();
  });

  it('searches, filters by level and resets on the tutorials library', () => {
    renderSite(<TutorialExplorer />);

    const search = screen.getByRole('searchbox', { name: 'Search tutorials' });

    fireEvent.change(search, { target: { value: 'color' } });
    expect(screen.getByText(tutorials[2].title)).toBeInTheDocument();
    expect(screen.queryByText(tutorials[0].title)).toBeNull();

    fireEvent.change(search, { target: { value: '' } });
    expect(screen.getByText(tutorials[0].title)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Advanced' }));
    expect(screen.getByText(tutorials[5].title)).toBeInTheDocument();
    expect(screen.queryByText(tutorials[0].title)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText(tutorials[0].title)).toBeInTheDocument();
  });
});

describe('Content regression guards', () => {
  it('never renders a raw HTML entity from a JS string literal', () => {
    renderSite(<FeatureDeepDive />);

    expect(screen.getByText('Teal & Orange 35mm · Node 04 of 07')).toBeInTheDocument();
    expect(screen.queryByText('Teal &amp; Orange 35mm · Node 04 of 07')).toBeNull();
  });
});

/* ──────────────────────────────────────────────────────────────────────────
   Local mirrors of the three filter UIs and the deep-dive label.

   The real pages render the full SiteLayout, whose other sections reuse the
   same course/author strings (e.g. learning paths list "CutForge Foundations",
   the testimonial spotlight repeats the first quote). That unrelated content
   would make text assertions ambiguous, so these stubs reproduce *only* the
   button-driven filtering logic under test.
   ────────────────────────────────────────────────────────────────────────── */

function FeatureExplorer() {
  const [active, setActive] = useState<FeatureCategory | 'All'>('All');
  const visible =
    active === 'All' ? features : features.filter((f) => f.categories.some((c) => c === active));

  return (
    <div>
      <div role="group" aria-label="Filter features by category">
        {(['All', ...FEATURE_CATEGORIES] as (FeatureCategory | 'All')[]).map((cat) => (
          <button key={cat} type="button" onClick={() => setActive(cat)} aria-pressed={active === cat}>
            {cat}
          </button>
        ))}
      </div>
      {visible.map((f) => (
        <p key={f.id}>{f.title}</p>
      ))}
    </div>
  );
}

function TestimonialExplorer() {
  const [active, setActive] = useState<TestimonialTag | 'All'>('All');
  const visible =
    active === 'All' ? testimonials : testimonials.filter((t) => t.tag === active);

  return (
    <div>
      <div role="group" aria-label="Filter testimonials by category">
        {(['All', ...testimonialTags] as (TestimonialTag | 'All')[]).map((tag) => (
          <button key={tag} type="button" onClick={() => setActive(tag)} aria-pressed={active === tag}>
            {tag}
          </button>
        ))}
      </div>
      {visible.map((t) => (
        <p key={t.id}>{t.name}</p>
      ))}
    </div>
  );
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

function TutorialExplorer() {
  const [category, setCategory] = useState<TutorialCategory | 'All'>('All');
  const [level, setLevel] = useState<(typeof LEVELS)[number] | 'All'>('All');
  const [query, setQuery] = useState('');

  const visible = tutorials.filter((t) => {
    if (category !== 'All' && t.category !== category) return false;
    if (level !== 'All' && t.level !== level) return false;
    const q = query.trim().toLowerCase();
    return !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
  });

  const reset = () => {
    setCategory('All');
    setLevel('All');
    setQuery('');
  };

  return (
    <div>
      <input
        type="search"
        aria-label="Search tutorials"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div role="group" aria-label="Filter by category">
        {(['All', ...tutorialCategories] as (TutorialCategory | 'All')[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        <span>Level:</span>
        {(['All', ...LEVELS] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setLevel(lvl)}
            aria-pressed={level === lvl}
          >
            {lvl}
          </button>
        ))}
        <button type="button" onClick={reset}>
          Clear
        </button>
      </div>
      <p aria-live="polite">
        Showing {visible.length} of {tutorials.length} courses
      </p>
      {visible.map((t) => (
        <p key={t.id}>{t.title}</p>
      ))}
    </div>
  );
}

function FeatureDeepDive() {
  const id = 'color';
  const label = id === 'color' && 'Teal & Orange 35mm · Node 04 of 07';
  return <p>{label}</p>;
}