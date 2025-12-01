export const mockUsers = [
  {
    id: 'user-1',
    name: 'Elena Wordsworth',
    username: 'elenawords',
    email: 'elena@inkwell.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=ffd5dc',
    bio: 'Writer, dreamer, and coffee enthusiast. Exploring the intersections of technology and humanity through words.',
    followers: ['user-2', 'user-3'],
    following: ['user-2'],
    joinedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    username: 'marcuschen',
    email: 'marcus@inkwell.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus&backgroundColor=c0aede',
    bio: 'Software architect by day, philosophical wanderer by night. Writing about code, life, and everything in between.',
    followers: ['user-1'],
    following: ['user-1', 'user-3'],
    joinedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Sofia Rivera',
    username: 'sofiarivera',
    email: 'sofia@inkwell.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia&backgroundColor=d1f4d1',
    bio: 'Design thinker and visual storyteller. Passionate about creating experiences that matter.',
    followers: ['user-2'],
    following: [],
    joinedAt: '2024-03-10T00:00:00Z',
  },
];

export const mockArticles = [
  {
    id: 'article-1',
    title: 'The Art of Slowing Down in a Fast-Paced World',
    excerpt: 'In our relentless pursuit of productivity, we\'ve forgotten the transformative power of stillness. Here\'s how embracing slowness changed everything.',
    content: `
      <p>There's a peculiar madness in the way we live today. We wake to alarms, scroll through notifications before our eyes fully open, and spend our days in a perpetual state of catching up. We've become experts at doing more, yet somehow feel like we're accomplishing less.</p>
      
      <h2>The Velocity Trap</h2>
      
      <p>I used to pride myself on speed. Emails answered within minutes. Projects completed ahead of schedule. A calendar so packed it resembled a game of Tetris. But somewhere along the way, I noticed something troubling: I couldn't remember the last time I'd had a thought that wasn't immediately interrupted by another.</p>
      
      <blockquote>"The great omission in American life is solitude; not loneliness, for this is an alienation that thrives most in the midst of crowds, but that zone of time and space free from outside pressure which is the incubator of the spirit." — Marya Mannes</blockquote>
      
      <p>This quote found me at exactly the right moment. I was sitting in a coffee shop, simultaneously answering emails, eating lunch, and listening to a podcast. Efficiency, I thought. But when I looked up, I realized I hadn't tasted a single bite, couldn't recall what the podcast was about, and had sent an email to the wrong person.</p>
      
      <h2>The Experiment</h2>
      
      <p>So I tried something radical: I slowed down. Not dramatically—I still have responsibilities, deadlines, a life that demands engagement. But I began introducing friction where I'd previously optimized it away.</p>
      
      <p>I started with mornings. Instead of reaching for my phone, I sat with my coffee. Just sat. The first few days were excruciating. My brain screamed for stimulation. But gradually, something shifted. Thoughts began to complete themselves. Ideas connected in unexpected ways.</p>
      
      <h2>What I Discovered</h2>
      
      <p>Slowing down isn't about doing less—it's about being present for what you're doing. When I write now, I write. When I walk, I notice the particular slant of afternoon light, the way shadows pool beneath trees, the rhythm of my own breathing.</p>
      
      <p>The paradox is beautiful: by slowing down, I've become more productive. Not in the frantic, scattered way I was before, but in a way that feels sustainable, meaningful, actually connected to my values and intentions.</p>
      
      <p>This isn't a prescription. Your path to presence will look different from mine. But I invite you to try: what if you gave yourself permission to move through one moment today at half speed? What might you notice? What might finally have room to emerge?</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    author: mockUsers[0],
    publishedAt: '2024-11-28T10:00:00Z',
    readTime: 5,
    claps: 2847,
    tags: ['Mindfulness', 'Productivity', 'Life'],
    comments: [
      {
        id: 'comment-1',
        author: mockUsers[1],
        content: 'This resonates so deeply. I\'ve been trying to implement "digital sabbaths" and the difference is remarkable.',
        createdAt: '2024-11-28T14:30:00Z',
        likes: 24,
      },
    ],
    bookmarkedBy: ['user-2'],
  },
  {
    id: 'article-2',
    title: 'Building Software That Respects Human Attention',
    excerpt: 'As developers, we have an ethical responsibility to create technology that enhances rather than exploits. A manifesto for mindful engineering.',
    content: `
      <p>Every line of code we write is a choice. A choice about what we value, what we believe humans deserve, and what kind of future we're building. Too often, that choice defaults to engagement metrics over wellbeing, retention over respect.</p>
      
      <h2>The Attention Economy's Hidden Cost</h2>
      
      <p>We've built an infrastructure of interruption. Push notifications, infinite scrolls, autoplay videos—each feature carefully designed to capture and hold attention. And it works. Perhaps too well.</p>
      
      <p>The average person checks their phone 96 times a day. That's once every 10 minutes of waking life. Behind each check is a small spike of cortisol, a micro-interruption that fragments focus and accumulates into chronic cognitive strain.</p>
      
      <h2>A Different Path</h2>
      
      <p>But technology doesn't have to be adversarial. We can build software that:</p>
      
      <ul>
        <li><strong>Respects time boundaries</strong> — Do Not Disturb modes that actually work, scheduling features that encourage healthy usage patterns</li>
        <li><strong>Provides natural stopping points</strong> — Instead of infinite scroll, clear pagination that allows users to feel "done"</li>
        <li><strong>Offers transparency</strong> — Usage dashboards that help users understand their own behavior</li>
        <li><strong>Defaults to calm</strong> — Notifications off by default, with intentional opt-in for what truly matters</li>
      </ul>
      
      <h2>The Technical Implementation</h2>
      
      <p>Here's a simple example of a "respectful notification" system:</p>
      
      <pre><code>class RespectfulNotifier {
  constructor(options) {
    this.quietHours = options.quietHours || { start: 22, end: 8 };
    this.batchInterval = options.batchInterval || 3600000; // 1 hour
    this.pendingNotifications = [];
  }
  
  shouldNotify() {
    const hour = new Date().getHours();
    return hour < this.quietHours.start && 
           hour >= this.quietHours.end;
  }
  
  queue(notification) {
    if (notification.urgent && this.shouldNotify()) {
      return this.sendImmediate(notification);
    }
    this.pendingNotifications.push(notification);
  }
}</code></pre>
      
      <p>Small architectural decisions compound into vastly different user experiences. Choose wisely.</p>
      
      <h2>A Call to Action</h2>
      
      <p>Next time you're in a product meeting discussing "engagement," ask: engagement at what cost? To whom? We have the skills to build a digital world that uplifts rather than depletes. The question is whether we have the will.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    author: mockUsers[1],
    publishedAt: '2024-11-25T09:00:00Z',
    readTime: 7,
    claps: 4123,
    tags: ['Technology', 'Ethics', 'Software Development'],
    comments: [],
    bookmarkedBy: ['user-1', 'user-3'],
  },
  {
    id: 'article-3',
    title: 'The Visual Language of Silence',
    excerpt: 'In design, what we leave out speaks as loudly as what we include. Exploring the profound impact of negative space.',
    content: `
      <p>The most powerful element in design is often invisible. It's the pause between notes that makes music. The breath between words that gives poetry its rhythm. In visual design, we call it negative space—and mastering it transforms good design into great design.</p>
      
      <h2>Lessons from Japanese Aesthetics</h2>
      
      <p>The Japanese concept of "ma" (間) refers to the gap, pause, or space between things. It's not emptiness—it's pregnant with possibility. When I first encountered this idea, it revolutionized how I approach every design problem.</p>
      
      <p>Consider the traditional Japanese garden. Unlike Western gardens that often fill every inch with color and form, Japanese gardens use emptiness as a compositional element. The raked gravel around a stone isn't absence—it's presence of a different kind.</p>
      
      <h2>Applying Ma to Digital Design</h2>
      
      <p>In our screen-based world, the temptation is always to add more. More features, more content, more options. But every element we add competes for attention. Sometimes the bravest design decision is subtraction.</p>
      
      <p>Apple understood this early. The original iPod didn't succeed because of what it could do—dozens of MP3 players had similar capabilities. It succeeded because of what it didn't do. The click wheel wasn't a feature list; it was a philosophy made tangible.</p>
      
      <h2>Practical Principles</h2>
      
      <p>When I review my designs now, I ask three questions:</p>
      
      <ol>
        <li><strong>What can I remove?</strong> — Every element should earn its place. If it's not serving the core purpose, it's a distraction.</li>
        <li><strong>Where does the eye rest?</strong> — Negative space creates visual breathing room. Without it, designs feel claustrophobic.</li>
        <li><strong>What story does the silence tell?</strong> — The space around an element can elevate its importance, create tension, or invite contemplation.</li>
      </ol>
      
      <p>Great design isn't about filling space—it's about shaping it. The empty areas of your composition are just as important as the filled ones. Perhaps more so.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?w=1200&h=600&fit=crop',
    author: mockUsers[2],
    publishedAt: '2024-11-22T14:00:00Z',
    readTime: 4,
    claps: 1856,
    tags: ['Design', 'Creativity', 'Philosophy'],
    comments: [
      {
        id: 'comment-2',
        author: mockUsers[0],
        content: 'The connection to Japanese aesthetics is so apt. I\'ve been incorporating more white space in my writing layouts and the readability improvement is dramatic.',
        createdAt: '2024-11-22T18:45:00Z',
        likes: 12,
      },
      {
        id: 'comment-3',
        author: mockUsers[1],
        content: 'This applies to code architecture too! The best codebases have clear separations and "breathing room" between concerns.',
        createdAt: '2024-11-23T09:15:00Z',
        likes: 31,
      },
    ],
    bookmarkedBy: ['user-1'],
  },
  {
    id: 'article-4',
    title: 'On the Necessity of Difficult Books',
    excerpt: 'In an age of summaries and shortcuts, there\'s something vital we lose when we abandon the challenging text.',
    content: `
      <p>Last month, I finally finished reading "Infinite Jest." It took me fourteen months. There were times I wanted to quit, passages I had to read three times, footnotes that led to other footnotes in an endless labyrinth of meaning.</p>
      
      <p>It was glorious.</p>
      
      <h2>The Case Against Difficulty</h2>
      
      <p>We live in an optimization culture. Every inefficiency is a bug to be fixed. Long articles get summarized. Complex ideas get bullet-pointed. "Here's the TL;DR" has become our intellectual shorthand.</p>
      
      <p>And there's value in this. Not everything deserves deep attention. Sometimes you just need to know the gist. But somewhere along the way, we've started treating all difficulty as unnecessary friction rather than essential feature.</p>
      
      <h2>What Struggle Teaches</h2>
      
      <p>The difficult book changes you in ways the easy book cannot. When you wrestle with syntax, when you sit with confusion, when you finally break through to understanding—something happens. Neural pathways form that weren't there before. You've literally become a different person.</p>
      
      <blockquote>"A book must be the axe for the frozen sea within us." — Franz Kafka</blockquote>
      
      <p>The frozen sea doesn't melt from gentle warmth. It needs impact. And impact requires resistance.</p>
      
      <h2>A Personal Canon of Difficulty</h2>
      
      <p>These are the books that broke me and remade me:</p>
      
      <ul>
        <li><em>Ulysses</em> by James Joyce — Taught me that language can do anything</li>
        <li><em>Being and Time</em> by Heidegger — Showed me how to question what I thought I knew</li>
        <li><em>Gravity's Rainbow</em> by Pynchon — Proved that confusion can be exhilarating</li>
        <li><em>The Brothers Karamazov</em> by Dostoevsky — Demonstrated that moral complexity is irreducible</li>
      </ul>
      
      <p>None of these books are "efficient." All of them are essential.</p>
      
      <h2>The Invitation</h2>
      
      <p>I'm not suggesting you abandon quick reads and beach novels. But I am suggesting that you keep one difficult book in rotation. Something that pushes back. Something that makes you work.</p>
      
      <p>The rewards, I promise, are worth the struggle.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=600&fit=crop',
    author: mockUsers[0],
    publishedAt: '2024-11-18T11:00:00Z',
    readTime: 6,
    claps: 3241,
    tags: ['Reading', 'Culture', 'Personal Growth'],
    comments: [],
    bookmarkedBy: [],
  },
  {
    id: 'article-5',
    title: 'Debugging Your Life: A Programmer\'s Guide to Personal Systems',
    excerpt: 'What happens when you apply software engineering principles to the messy business of being human? Surprisingly useful insights.',
    content: `
      <p>After twenty years of debugging code, I've started noticing something: the same patterns that create bugs in software create problems in life. And the same systematic approaches that fix code can fix us.</p>
      
      <h2>The Bug Report</h2>
      
      <p>Every debugging session starts with understanding the problem. In code, we write bug reports. In life, we often skip this step, jumping straight to solutions for problems we haven't clearly defined.</p>
      
      <p>Try writing a bug report for your life:</p>
      
      <ul>
        <li><strong>Expected behavior:</strong> What should be happening?</li>
        <li><strong>Actual behavior:</strong> What's actually happening?</li>
        <li><strong>Steps to reproduce:</strong> What conditions trigger the problem?</li>
        <li><strong>Environment:</strong> What external factors might be relevant?</li>
      </ul>
      
      <p>Suddenly, vague dissatisfaction becomes actionable insight.</p>
      
      <h2>Root Cause Analysis</h2>
      
      <p>In engineering, we have the "5 Whys" technique. You keep asking why until you hit bedrock. Most personal problems have similar root causes hiding beneath surface symptoms.</p>
      
      <p><em>I'm always tired.</em><br/>
      Why? I don't sleep enough.<br/>
      Why? I stay up late on my phone.<br/>
      Why? I'm anxious and the phone distracts me.<br/>
      Why? I have unresolved work stress.<br/>
      Why? I never set boundaries with my manager.</p>
      
      <p>The surface problem was "tired." The root cause was "boundaries." Treating tiredness with coffee would be like putting console.log statements in production—a temporary band-aid that masks the real issue.</p>
      
      <h2>Refactoring</h2>
      
      <p>In code, refactoring means restructuring without changing behavior. In life, it's about finding more elegant solutions to the same problems.</p>
      
      <p>Maybe your morning routine is legacy code—grown organically over years, full of redundancies and workarounds. What if you refactored it? Keep what works, eliminate what doesn't, and organize the rest for clarity.</p>
      
      <h2>Version Control</h2>
      
      <p>Here's a practice I love: treating personal changes like git commits. Small, incremental, reversible. Too many people try to change everything at once—the equivalent of a massive refactor with no tests. It almost always fails.</p>
      
      <p>Instead: small commits. One new habit at a time. Merge only when stable. Revert when needed.</p>
      
      <p>Life is complex, but it's not unsolvable. With the right systematic approach, even the messiest problems start to yield.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    author: mockUsers[1],
    publishedAt: '2024-11-15T08:30:00Z',
    readTime: 8,
    claps: 5672,
    tags: ['Programming', 'Self Improvement', 'Life'],
    comments: [
      {
        id: 'comment-4',
        author: mockUsers[2],
        content: 'The bug report template for life is genius. I\'m going to use this in my next journaling session.',
        createdAt: '2024-11-15T12:00:00Z',
        likes: 45,
      },
    ],
    bookmarkedBy: ['user-3'],
  },
  {
    id: 'article-6',
    title: 'The Color of Memory',
    excerpt: 'A meditation on how colors shape our recollections, and why the palette of our past is never quite accurate.',
    content: `
      <p>Close your eyes and think of your childhood home. What colors do you see? The walls, the furniture, the light that came through the windows. I'd wager your memory has shifted those hues—warmed the yellows, deepened the blues, cast everything in the golden hour of nostalgia.</p>
      
      <p>We don't remember colors. We remember feelings, and our mind paints accordingly.</p>
      
      <h2>The Science of Chromatic Memory</h2>
      
      <p>Research shows that our memory for color is remarkably poor compared to our memory for shapes or faces. We remember "it was blue" but lose the specific shade. And in the reconstruction, our brains reach for emotional truth rather than factual accuracy.</p>
      
      <p>Happy memories skew warm. The summers of childhood are always more golden than any summer we experience now. Sadness desaturates. Grief photographs in sepia.</p>
      
      <h2>Designing for Memory</h2>
      
      <p>As designers, this has profound implications. The colors we choose don't just affect how something looks—they affect how it will be remembered.</p>
      
      <p>Instagram understood this intuitively. Those early filters—the warmth, the fade, the vintage grain—weren't just aesthetic choices. They were pre-nostalgiaing the present, making every moment feel like a memory even as it happened.</p>
      
      <h2>A Personal Experiment</h2>
      
      <p>I've started keeping a color diary. Each day, I note the dominant color of my experience—not what I saw most, but what the day felt like chromatically. Some days are muted ochre. Some are sharp cyan. The cumulative effect is a kind of emotional calendar, a year rendered in swatches.</p>
      
      <p>Looking back, I can see patterns I wouldn't otherwise notice. Seasons of grey. Weeks of unexpected vibrancy. The colors of stress versus the colors of peace.</p>
      
      <p>What color is today for you?</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=1200&h=600&fit=crop',
    author: mockUsers[2],
    publishedAt: '2024-11-10T16:00:00Z',
    readTime: 4,
    claps: 2134,
    tags: ['Design', 'Psychology', 'Creativity'],
    comments: [],
    bookmarkedBy: ['user-2'],
  },
];

export const allTags = [
  'Mindfulness',
  'Productivity',
  'Life',
  'Technology',
  'Ethics',
  'Software Development',
  'Design',
  'Creativity',
  'Philosophy',
  'Reading',
  'Culture',
  'Personal Growth',
  'Programming',
  'Self Improvement',
  'Psychology',
];
