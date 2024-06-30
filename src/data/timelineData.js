// src/data/timelineData.js

export const timelineData = {
  "Western-European-art-periodization": [
    {
      id: "epoch1",
      epoch: "Ancient",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Homeric Era",
          dates: "12th–8th centuries BCE",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Archaic Period",
          dates: "7th–5th centuries BCE",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Classical Period",
          dates: "5th–1st centuries BCE",
          subperiodsIcon: "/src/assets/subperiodsIcon.svg",
          expandable: true,
          expanded: false,
          type: "subperiods",
          subperiods: [
            {
              title: "Early Classical",
              dates: "480–450 BCE",
              trend: "rise",
              expanded: false,
            },
            {
              title: "High Classical",
              dates: "450–400 BCE",
              trend: "rise",
              expanded: false,
            },
            {
              title: "Late Classical",
              dates: "400–323 BCE",
              trend: "rise",
              expanded: false,
            },
          ],
        },
        {
          title: "Hellenistic Period",
          dates: "mid-4th century BCE — 1st century BCE",
          trend: "rise",
          expanded: false,
        },
      ],
    },
    {
      id: "epoch2",
      epoch: "Medieval",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Early Middle Ages",
          dates: "260 — 525 centuries",
          trend: "decline",
          expanded: false,
        },
        {
          title: "Romanesque",
          dates: "800 — 1200 centuries",
          crisisIcon: "/src/assets/crisisIcon.svg",
          expandable: true,
          expanded: false,
          type: "crisis",
          crisis: [
            {
              title: "Iconoclasm",
              trend: "decline",
              expanded: false,
            },
          ],
        },
        {
          title: "Gothic",
          dates: "1100 — 1400 centuries",
          transitionIcon: "/src/assets/transitionIcon.svg",
          expandable: true,
          expanded: false,
          type: "transition",
          transition: [
            {
              title: "Proto-Renaissance",
              trend: "rise",
              expanded: false,
            },
          ],
        },
      ],
    },
    {
      id: "epoch3",
      epoch: "Renaissance",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Early Renaissance",
          dates: "1520 — 1600 centuries",
          trend: "rise",
          expanded: false,
        },
        {
          title: "High Renaissance",
          dates: "1520 — 1600 centuries",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Mannerism",
          dates: "1520 — 1600 centuries",
          trend: "decline",
          expanded: false,
        },
      ],
    },
    {
      id: "epoch4",
      epoch: "The Age of Enlightenment",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Baroque",
          dates: "1600 — 1730 centuries",
          trend: "rise",
          transitionIcon: "/src/assets/transitionIcon.svg",
          expandable: true,
          expanded: false,
          type: "transition",
          transition: [
            {
              title: "Rococo",
              dates: "1720 — 1780 centuries",
              expanded: false,
            },
          ],
        },
        {
          title: "Classicism",
          dates: "1750 — 1830 centuries",
          trend: "rise",
          expanded: false,
        },
      ],
    },
    {
      id: "epoch5",
      epoch: "Romanticism",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Sentimentalism",
          dates: "late 18th century — early 19th century",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Academism",
          dates: "mid 19th century",
          schoolsIcon: "/src/assets/schoolsIcon.svg",
          expandable: true,
          expanded: false,
          type: "schools",
          schools: [
            {
              title: "Biedermeier",
              dates: "1815 — 1848",
              trend: "stability",
              expanded: false,
            },
            {
              title: "Academism",
              trend: "decline",
              expanded: false,
            },
          ],
        },
        {
          title: "Realism",
          dates: "mid 19th century",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Pre-Raphaelitism",
          dates: "mid 19th century",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Eclecticism",
          dates: "late 19th century",
          trend: "decline",
          expanded: false,
        },
      ],
    },
    {
      id: "epoch6",
      epoch: "Modernism",
      expandable: true,
      expanded: false,
      subItems: [
        {
          title: "Impressionism",
          dates: "1860 — 1890",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Art Nouveau",
          dates: "1890 — 1914",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Post-Impressionism",
          dates: "1886 — 1905",
          trend: "rise",
          expanded: false,
        },
        {
          title: "Symbolism",
          dates: "1880 — 1910",
          trend: "decline",
          expanded: false,
        },
      ],
    },
  ],
};
