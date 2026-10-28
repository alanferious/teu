// Unit 3 real-world examples: the best recent, non-US cases for each macro subtopic, researched and
// checked against the linked sources on 28 October 2026. Same shape as data/examples.js. The ratings are
// ours, not examiner scores. Figures move: check the newest numbers before an exam.
const MACRO = [
 {
  "id": "ireland-gdp-vs-gni-star",
  "tk": "GNIX",
  "title": "Ireland: GDP up 8%, real economy up 4.7%",
  "region": "Ireland",
  "years": "2024–2026",
  "subtopic": "3.1",
  "concepts": [
   "Gross domestic product (GDP)",
   "Gross national income (GNI)",
   "GDP vs GNI",
   "income paid to foreign residents",
   "limitations of GDP",
   "real GDP"
  ],
  "hook": "Ireland's GDP grew 8.0% in 2025, but the CSO's modified GNI* measure, which strips out multinational profits, grew only 4.7%. GNI* is just 55.4% of GDP.",
  "facts": [
   "CSO Annual National Accounts (2 July 2026): GDP rose 8.0% in 2025, driven by multinational-dominated sectors that grew 14.5%, while modified GNI* rose 4.7% and GNP only 1.0%.",
   "In 2025 GDP was €602.4bn at current prices but GNI* was €334bn, so GNI* was 55.4% of GDP, down from 57.2% in 2024.",
   "The gap can run the other way: in 2024 GDP grew only 2.6% while GNI* grew 4.8%, because that year growth came from domestic sectors.",
   "Investment rose 31.5% in 2025, mainly from spending on intangible assets such as intellectual property moved into Ireland by multinationals.",
   "Q2 2026 (CSO, 4 September 2026): GDP jumped 10.2% in a single quarter while modified domestic demand, the CSO's gauge of the home economy, fell 0.8%."
  ],
  "diagram": "No standard diagram. Show the formula: GNI = GDP + income earned abroad by residents − income paid to foreign residents. Ireland pays out huge profit flows to foreign-owned firms, so GNI is far below GDP. A circular flow sketch with a large leakage of factor income abroad also works.",
  "evaluation": [
   "GDP measures output produced in Ireland, not income kept by Irish residents. When multinationals book intellectual property and profits in Ireland, GDP rises but much of the income flows abroad, so GDP overstates living standards.",
   "Even GNI* is imperfect: it removes depreciation on foreign-owned intellectual property and leased aircraft, which needs judgement, and it still ignores distribution, unpaid work and environmental costs.",
   "Choice of measure changes policy: debt or spending as a share of GDP looks far smaller than as a share of GNI*, so the government and the CSO focus on GNI* and modified domestic demand for budget decisions.",
   "Volatility makes GDP unreliable for the business cycle: a 10.2% quarterly jump in Q2 2026 alongside falling domestic demand shows GDP can signal a boom that households do not feel."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best example of why GDP and GNI differ, with official CSO numbers for 2025 and 2026. Weakness: GNI* is an Irish-only measure, so explain it in one line before using it.",
  "sources": [
   "https://www.cso.ie/en/releasesandpublications/ep/p-ana/annualnationalaccounts2025/keyfindings/",
   "https://www.cso.ie/en/csolatestnews/pressreleases/2026pressreleases/pressstatementannualnationalaccountsforyear2025ana2025updatedquarterlynationalaccountsandinternationalaccountsforquarter12026/",
   "https://www.cso.ie/en/csolatestnews/pressreleases/2025pressreleases/pressstatementannualnationalaccountsforyear2024ana2024updatedquarterlynationalaccountsandinternationalaccountsforquarter12025",
   "https://www.irishexaminer.com/business/economy/arid-41906785.html",
   "https://www.cso.ie/en/releasesandpublications/ep/p-ana/annualnationalaccounts2025/gniandde-globalisedresults/"
  ],
  "mem": {
   "tag": "Leprechaun GDP",
   "story": "Multinationals book IP and profits in Ireland → GDP jumps 8.0% → profits flow back to foreign owners → GNI* grows only 4.7%",
   "numbers": [
    [
     "8.0%",
     "Irish GDP growth, 2025"
    ],
    [
     "4.7%",
     "modified GNI* growth, 2025"
    ],
    [
     "55.4%",
     "GNI* as a share of GDP, 2025"
    ]
   ],
   "use": "GDP vs GNI, limitations of GDP, comparing living standards, measuring the business cycle",
   "but": "GNI* itself relies on CSO judgements about which foreign-owned assets to strip out, so it is an estimate, not a pure measure of welfare."
  }
 },
 {
  "id": "nigeria-gdp-rebasing-2025",
  "tk": "NAIJ",
  "title": "Nigeria rebases GDP: a third bigger overnight",
  "region": "Nigeria",
  "years": "2025–2026",
  "subtopic": "3.1",
  "concepts": [
   "Gross domestic product (GDP)",
   "nominal GDP",
   "GDP per capita",
   "limitations of GDP",
   "informal economy",
   "real GDP"
  ],
  "hook": "In July 2025 Nigeria's statisticians updated their methods and the 2024 economy grew from ₦277.5tn to ₦372.8tn, without a single extra barrel or harvest.",
  "facts": [
   "On 21 July 2025 the National Bureau of Statistics moved the GDP base year from 2010 to 2019 and put 2024 nominal GDP at ₦372.8tn (about $243bn).",
   "Agusto & Co: the previous estimate for 2024 was ₦277.5tn, so rebasing raised measured GDP by about 34%.",
   "The new series covers digital services, fintech, modular refineries, pension funds and more informal activity; the informal sector now makes up 42.5% of measured GDP.",
   "Ratios changed overnight: debt-to-GDP fell from 52.1% to 39.4%, while tax revenue is only 13.5% of the bigger GDP.",
   "In dollars GDP per head fell from about $2,100 in 2019 to $1,095 in 2024 as the naira lost value. Real GDP grew 3.87% in 2025 and 4.43% year on year in Q2 2026 (NBS)."
  ],
  "diagram": "No standard diagram. Circular flow: show informal market activity as output that was previously outside the measured flow. Use the GDP per capita formula (GDP ÷ population) to show why a bigger GDP can still mean a low and falling income per head in dollars.",
  "evaluation": [
   "Rebasing shows GDP understates output where the informal economy is large. Even after the update, a big share of informal and illegal activity is still hard to capture, so the 'true' figure is unknown.",
   "Nothing real changed: households did not become richer when GDP was revised up. The fall in the debt-to-GDP ratio is statistical, and debt interest still has to be paid from a low tax take.",
   "Nominal dollar figures mislead: a weaker naira halved dollar GDP per head between 2019 and 2024. PPP or real figures in naira give a fairer view of living standards.",
   "Better data has real benefits: new sectors such as fintech are now visible to policymakers and investors, and regular rebasing every five years makes comparisons over time more reliable."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Excellent for limitations of GDP and the informal economy in a developing country. Weakness: sources give different sizes for the jump (34% to 42%) depending on which old estimate they compare with.",
  "sources": [
   "https://www.agusto.com/publications/nigerias-rebased-gdp-new-numbers-old-problems/",
   "https://www.ecofinagency.com/news/2407-47819-nigeria-boosts-gdp-estimate-after-rebasing-shrinks-debt-to-gdp-ratio",
   "https://nairametrics.com/2026/08/31/nigerias-gdp-grows-by-4-43-in-q2-2026/",
   "https://von.gov.ng/nigerias-gdp-growth-accelerates-to-4-43-in-q2-2026/"
  ],
  "mem": {
   "tag": "Bigger on paper",
   "story": "NBS updates base year to 2019 → informal and digital activity counted → GDP jumps to ₦372.8tn → debt ratio falls, but income per head still only $1,095",
   "numbers": [
    [
     "₦372.8tn",
     "Nigeria's rebased 2024 GDP"
    ],
    [
     "42.5%",
     "informal sector share of measured GDP"
    ],
    [
     "$1,095",
     "GDP per head in dollars, 2024"
    ]
   ],
   "use": "limitations of GDP, informal economy, nominal vs real, GDP per capita, comparing countries",
   "but": "A bigger GDP did not raise anyone's income, and tax revenue is still only 13.5% of GDP."
  }
 },
 {
  "id": "bhutan-gnh-vs-emigration",
  "tk": "BHUT",
  "title": "Bhutan: happiness index up, young graduates leaving",
  "region": "Bhutan",
  "years": "2022–2025",
  "subtopic": "3.1",
  "concepts": [
   "alternative measures of well-being",
   "Happiness Index",
   "limitations of GDP",
   "composite indicators",
   "subjective survey data"
  ],
  "hook": "Bhutan measures success by Gross National Happiness, and its index rose to 0.781 in 2022. Yet 53% of the people now emigrating, mostly to Australia, are university graduates.",
  "facts": [
   "Bhutan's 2022 GNH Index, launched on 22 May 2023, was 0.781 on a 0 to 1 scale, up 3.3% from 0.756 in 2015. It combines nine domains and 33 indicators, including health, time use, community and ecology.",
   "Only 48.1% of people were classed as 'deeply' or 'extensively' happy in 2022 (9.5% deeply, 38.6% extensively).",
   "World Bank (30 September 2025): a recent surge in emigration, mainly to Australia; 53% of migrants hold university degrees against about 7% of the working-age population, and nearly half are civil servants.",
   "13,406 Bhutanese students enrolled at Australian universities between January and September 2024. Most migrants earned under Nu 40,000 a month at home but at least Nu 60,000 in Australia.",
   "In 2022 unemployment was 6% overall but 12% for the highly educated and 15% for urban women (World Bank)."
  ],
  "diagram": "No standard diagram. Compare a single indicator (GDP per capita) with a composite index (GNH: nine domains, weighted). A simple table of what each includes works well.",
  "evaluation": [
   "GNH captures what GDP leaves out, such as time use, community life and the environment, so it gives a fuller picture of well-being than income alone.",
   "But the weightings and survey questions are chosen by the government, so the index is subjective and hard to compare with other countries.",
   "People 'vote with their feet': rising GNH scores alongside an exodus of graduates suggests that income and job opportunities, which GDP does measure, still matter a great deal.",
   "Timing matters: the latest GNH survey is from 2022, before the 2023–2025 emigration surge, so the index may already be out of date."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "The best example for alternative well-being measures, with a built-in counter-argument. Weakness: the GNH survey dates from 2022 and there is no official total count of emigrants.",
  "sources": [
   "https://ophi.org.uk/ophi_stories/story-bhutan-gnh-2022",
   "https://www.worldbank.org/en/news/press-release/2025/10/01/reforms-can-help-bhutan-benefit-from-sustainable-migration-world-bank"
  ],
  "mem": {
   "tag": "Happy but leaving",
   "story": "Bhutan targets happiness, not GDP → GNH Index rises to 0.781 → but low pay and few graduate jobs → graduates emigrate to Australia",
   "numbers": [
    [
     "0.781",
     "Bhutan's GNH Index, 2022"
    ],
    [
     "53%",
     "share of emigrants with university degrees"
    ],
    [
     "13,406",
     "Bhutanese students at Australian universities, Jan–Sep 2024"
    ]
   ],
   "use": "alternative measures of well-being, Happiness Index, limitations of GDP, composite vs single indicators",
   "but": "Only 48.1% of Bhutanese were deeply or extensively happy in 2022, and graduates are leaving for higher incomes."
  }
 },
 {
  "id": "new-zealand-per-capita-recession",
  "tk": "KIWI",
  "title": "New Zealand's per-person recession",
  "region": "New Zealand",
  "years": "2024–2026",
  "subtopic": "3.1 (also 3.2)",
  "concepts": [
   "business cycle",
   "recession",
   "GDP per capita",
   "trough",
   "expansion",
   "recessionary gap",
   "real GDP"
  ],
  "hook": "In September 2024 New Zealand's GDP per person fell for the eighth quarter running and was 2.7% lower than a year before, as high interest rates crushed demand while migration kept headline GDP looking better.",
  "facts": [
   "Stats NZ (19 December 2024): GDP fell 1.0% in the September 2024 quarter after a revised 1.1% fall in the June quarter, two quarters of decline. Excluding Covid, it was the weakest six months since June 1991.",
   "GDP per capita fell 1.2% in the September 2024 quarter, the eighth quarterly fall in a row, and was 2.7% lower than a year earlier.",
   "A second dip: GDP fell another 0.9% in the June 2025 quarter, the third fall in five quarters (Stats NZ, September 2025).",
   "Recovery: GDP grew 0.2% in the June 2026 quarter, the fourth rise in a row, and 1.7% over the year to June 2026. But GDP per capita rose only 0.1% and real gross national disposable income fell 0.4%, partly because of the 2026 fuel price spike."
  ],
  "diagram": "Business cycle diagram: mark the 2024 contraction and trough below the long-term growth trend (recessionary gap), then the 2025–2026 expansion. Optional AD/AS: AD shifts left as high interest rates cut consumption and investment.",
  "evaluation": [
   "Headline GDP can hide a deep downturn: strong migration raised total output, but output per person fell for two years, so GDP per capita is the better guide to living standards.",
   "The 'two negative quarters' rule is crude and depends on revisions: Stats NZ revised the June 2024 quarter from −0.2% to −1.1%, which changed the story after the event.",
   "Recovery in GDP does not mean recovery in incomes: in the year to June 2026 GDP rose 1.7% but real national disposable income fell, because higher fuel import prices took income abroad.",
   "Short run vs long run: the downturn was largely policy-induced to cut inflation, so it brought short-run costs (job losses) for a long-run gain in price stability."
  ],
  "rating": {
   "relevance": 4,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Good for the business cycle and per capita measures, with an Oceania case. Weakness: NZ quarterly data are heavily revised, so recent vintages may differ slightly from the 2024 figures.",
  "sources": [
   "https://nzherald.co.nz/business/economy/gdp/massive-gdp-fall-nz-in-deep-recession-worst-since-1991/CG5ZWBO6GFGCHAT5OT6EMK3UTQ/",
   "https://investinglive.com/news/new-zealand-q2-gdp-06-qq-vs-03-expected-20250917/amp",
   "https://www.1news.co.nz/2026/09/17/gdp-economy-grows-02-in-june-quarter/"
  ],
  "mem": {
   "tag": "Kiwi per-head slump",
   "story": "High interest rates squeeze spending → GDP falls in 2024 → per-person output falls 8 quarters in a row → slow recovery by 2026",
   "numbers": [
    [
     "1.2%",
     "fall in GDP per capita, Sept 2024 quarter"
    ],
    [
     "2.7%",
     "annual fall in GDP per capita to Sept 2024"
    ],
    [
     "1.7%",
     "GDP growth in the year to June 2026"
    ]
   ],
   "use": "business cycle, recession, GDP per capita, real GDP vs national income",
   "but": "Real national disposable income fell 0.4% in the year to June 2026 even as GDP rose 1.7%."
  }
 },
 {
  "id": "euro-area-energy-shocks-2022-2026",
  "tk": "ECBX",
  "title": "Europe's two energy shocks: 2022 and 2026",
  "region": "Euro area (Germany as main case)",
  "years": "2022–2026",
  "subtopic": "3.2 (also 3.3)",
  "concepts": [
   "short-run aggregate supply (SRAS)",
   "decrease in SRAS (cost-push)",
   "supply shock",
   "stagflation",
   "short-run equilibrium",
   "policy dilemma"
  ],
  "hook": "Euro area inflation hit a record 10.6% in October 2022 after Russia's invasion of Ukraine. In 2026 the Middle East war sent energy inflation back to 14.3%, and the ECB raised rates while growth was only 0.9%.",
  "facts": [
   "Eurostat: euro area inflation reached a record 10.6% in October 2022, up from 4.1% a year earlier, with energy prices up more than 40%.",
   "Germany, heavily reliant on Russian gas before 2022, then had two years of recession: real GDP fell 0.9% in 2023 and 0.5% in 2024 (Destatis, January 2026).",
   "ECB (10 September 2026): headline inflation rose to 3.3% in August 2026 and energy inflation to 14.3%, driven by the Middle East conflict. Staff project inflation of 3.0% and growth of only 0.9% for 2026.",
   "The ECB raised its key rates by 25 basis points in June and again in September 2026, taking the deposit rate to 2.50%.",
   "So far no wage spiral: compensation per employee grew 3.3% in Q2 2026, down from 3.5%, while unit profits rose from 0.3% to 2.2% (ECB)."
  ],
  "diagram": "Decrease in SRAS (cost-push): higher energy costs shift SRAS1 left to SRAS2, so the price level rises (PL1 to PL2) and real GDP falls (Y1 to Y2): stagflation. Add a vertical LRAS to show a recessionary gap opening. ECB rate rises then shift AD left, which lowers inflation but deepens the output loss.",
  "evaluation": [
   "A supply shock creates a policy dilemma: raising interest rates to fight inflation reduces AD and worsens the output gap, while cutting rates to support growth adds to inflation.",
   "The size of the damage depends on second-round effects: in 2022 wages chased prices, but in 2026 wage growth was slowing, so the ECB judged smaller rate rises would be enough.",
   "Winners and losers: energy-intensive industry and low-income households who spend more on fuel lose most, while energy producers and some firms that raised margins (unit profits up to 2.2%) gain.",
   "Short run vs long run: governments can cushion the shock with temporary, targeted support, but the long-run fix is LRAS-side: diversifying energy supply and speeding up renewables to reduce exposure to the next shock."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best SRAS shock for your exams: a classic 2022 case and a live 2026 sequel, with official ECB numbers. Weakness: the 2026 story is still moving, so check the latest ECB decision before the exam.",
  "sources": [
   "https://ec.europa.eu/eurostat/documents/2995521/15265521/2-17112022-AP-EN.pdf/",
   "https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/01/PD26_017_811.html",
   "https://www.bde.es/f/webbe/GAP/Secciones/SalaPrensa/ComunicadosBCE/DecisionesPoliticaMonetaria/26/mps260910en.pdf",
   "https://www.mtsinsights.com/summaries/10870/"
  ],
  "mem": {
   "tag": "Energy shock, take two",
   "story": "War cuts energy supply → energy prices jump → SRAS shifts left → inflation up, growth down → ECB raises rates",
   "numbers": [
    [
     "10.6%",
     "record euro area inflation, Oct 2022"
    ],
    [
     "14.3%",
     "euro area energy inflation, Aug 2026"
    ],
    [
     "2.50%",
     "ECB deposit rate after Sept 2026 rise"
    ]
   ],
   "use": "SRAS shifts, cost-push inflation, stagflation, policy dilemmas with supply shocks",
   "but": "Wage growth slowed to 3.3% in Q2 2026, so second-round effects may stay small and the shock may pass quickly."
  }
 },
 {
  "id": "brazil-inflationary-gap-selic-15",
  "tk": "SELC",
  "title": "Brazil: a hot economy meets a 15% interest rate",
  "region": "Brazil",
  "years": "2025–2026",
  "subtopic": "3.2 (also 3.5)",
  "concepts": [
   "inflationary gap",
   "output gap",
   "aggregate demand (AD)",
   "consumption (C)",
   "potential output",
   "decrease in AD"
  ],
  "hook": "With unemployment at a record-low 5.2% and a positive output gap, Brazil's central bank held its Selic rate at 15%, and growth slowed from 3.4% in 2024 to 2.3% in 2025.",
  "facts": [
   "The Copom raised the Selic to 15.00% in June 2025 and held it there into January 2026. Its September 2025 statement cited a 'more positive output gap', a resilient economy and pressure in the labour market.",
   "IBGE: unemployment fell to a record low of 5.2% in the three months to November 2025, with a record 103m people in work.",
   "IBGE (3 March 2026): GDP growth slowed to 2.3% in 2025 from 3.4% in 2024, which IBGE linked mainly to tight monetary policy; agriculture grew 11.7%.",
   "IPCA inflation ended 2025 at 4.26%, the lowest since 2018 and just inside the 4.5% ceiling of the 3% ± 1.5 point target band (IBGE, 9 January 2026).",
   "Fiscal policy pulled the other way: from January 2026 people earning up to R$5,000 a month stopped paying income tax. The Copom cut the Selic in 0.25-point steps from March 2026 to 13.75% on 16 September, but still expects 2026 inflation of 5.2%, above the 4.5% ceiling."
  ],
  "diagram": "Inflationary gap: AD crosses SRAS to the right of LRAS (real GDP above potential), with unemployment below the natural rate. Tight monetary policy shifts AD left back towards Yp. New classical alternative: without policy, higher wages shift SRAS left and close the gap at a higher price level.",
  "evaluation": [
   "Record-low unemployment and a positive output gap fit the textbook inflationary gap: AD above potential output pushes up wages and services inflation.",
   "Closing the gap through demand worked but was costly: growth fell to 2.3% and high interest rates hurt indebted households and firms, while savers and the currency gained.",
   "Policy conflict: tax cuts for lower earners in an election year raise C and AD, working against the central bank, so the gap may close more slowly.",
   "Supply side matters too: an 11.7% jump in farm output in 2025 raised supply and helped lower inflation, so not all of the improvement came from reducing AD."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Clear inflationary gap example from an emerging economy. Weakness: the output-gap evidence comes from central bank wording rather than a published number.",
  "sources": [
   "https://static.poder360.com.br/2025/09/Comunicado-Copom-17-set.pdf",
   "https://tradingeconomics.com/brazil/unemployment-rate/news/474175",
   "https://anba.com.br/en/brazils-gdp-grows-2-3-in-2025/",
   "https://www.mnimarkets.com/articles/mni-brief-brazils-2025-inflation-426percent-within-target-range-1767962680968",
   "https://camposthomaz.com/en/conhecimento-ct/president-lula-signs-expanded-income-tax-exemption-and-signals-further-steps-toward-tax-justice/",
   "https://www.canalrural.com.br/economia/copom-reafirma-cautela-e-reduz-selic-para-1375-ao-ano/"
  ],
  "mem": {
   "tag": "Hot jobs, 15% Selic",
   "story": "Strong demand and record-low unemployment → positive output gap → Selic held at 15% → growth slows to 2.3%, inflation back inside target",
   "numbers": [
    [
     "15.00%",
     "Brazil's Selic rate, June 2025 to Jan 2026"
    ],
    [
     "5.2%",
     "record-low unemployment, Sep–Nov 2025"
    ],
    [
     "2.3%",
     "GDP growth, 2025"
    ]
   ],
   "use": "inflationary gap, output gap, AD and interest rates, conflict between fiscal and monetary policy",
   "but": "An 11.7% jump in farm output also cut inflation, so the fall was not only due to lower AD."
  }
 },
 {
  "id": "china-deflation-ended-by-oil",
  "tk": "CHPI",
  "title": "China: 41 months of factory deflation, ended by a war",
  "region": "China",
  "years": "2022–2026",
  "subtopic": "3.3",
  "concepts": [
   "deflation",
   "good vs bad deflation",
   "deflationary spiral",
   "producer price index",
   "core inflation",
   "consumer price index (CPI)",
   "cost-push inflation"
  ],
  "hook": "China's factory-gate prices fell for 41 months in a row until March 2026, and what ended the slide was not stronger demand but an oil shock from the Middle East war.",
  "facts": [
   "2025: China's CPI was essentially 0% for the year, while the producer price index (PPI) fell 2.6%. BOFIT puts the 2025 GDP deflator at about -1%, so nominal GDP grew more slowly than real GDP.",
   "Weak demand showed across the basket in 2025: food prices fell 1.4%, transport nearly 3%, and core CPI (excluding food and energy) rose only 0.8%. Export prices were about 4% lower year on year at the end of 2025.",
   "PPI had been negative since October 2022. In March 2026 it rose 0.5% year on year (from -0.9% in February), ending 41 months of declines, as oil prices soared because of the Middle East war.",
   "September 2026: PPI inflation reached 5.0% (3.8% in August) and CPI 0.9%, but core CPI was only 1.0% and food prices were still falling (-1.7%)."
  ],
  "diagram": "AD/AS. 2023–25: AD shifts left (property slump, cautious households), so the price level falls and real GDP is below potential: bad deflation. 2026: SRAS shifts left as oil costs rise, so the price level rises with no recovery in AD.",
  "evaluation": [
   "Bad, not good, deflation: falling prices came mainly from weak household spending, not from rising LRAS, so firms cut prices to shift surplus output. That is the deflationary spiral risk the syllabus describes.",
   "The wrong kind of cure: 5.0% PPI inflation in September 2026 is cost-push from oil, which squeezes margins and real incomes. Core CPI of 1.0% shows underlying demand is still weak.",
   "Headline vs core vs PPI: CPI of 0.9% with food at -1.7% and core at 1.0% shows why economists look at several measures. The PPI turned first, acting as the early signal the course describes.",
   "Spillovers: export prices about 4% lower at end-2025 exported disinflation, helping importing households abroad but hurting competing producers."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best single example for deflation, good vs bad deflation and the PPI as an early signal, with a cost-push twist in 2026. Weakness: consumer prices barely fell below zero, so it is producer deflation plus near-zero CPI, not a deep consumer deflation.",
  "sources": [
   "https://www.bofit.fi/en/monitoring/weekly/2026/vw202608_2/",
   "https://www.hurriyetdailynews.com/amp/china-consumer-prices-rise-factory-gate-ends-deflation-streak-220859",
   "https://www.caixinglobal.com/2026-04-09/china-factory-prices-seen-ending-41-month-slide-as-oil-surges-102432069.html",
   "https://news.cgtn.com/news/2026-10-14/China-s-CPI-and-PPI-rise-faster-in-September-1RejVMpQwo0/share_amp.html"
  ],
  "mem": {
   "tag": "Deflation ended by a war",
   "story": "property slump and weak spending → CPI about 0% and PPI down 2.6% in 2025 → Middle East war lifts oil → PPI turns positive in March 2026 → PPI 5.0% by September, core CPI still 1.0%",
   "numbers": [
    [
     "41 months",
     "run of falling factory-gate prices to Feb 2026"
    ],
    [
     "2.6%",
     "fall in China's PPI in 2025"
    ],
    [
     "5.0%",
     "PPI inflation, September 2026"
    ]
   ],
   "use": "deflation, good vs bad deflation, costs of deflation, PPI vs CPI, core inflation, cost-push inflation",
   "but": "Consumer prices were about 0% in 2025, not deeply negative, so a full deflationary spiral never took hold."
  }
 },
 {
  "id": "south-africa-structural-unemployment",
  "tk": "SAJB",
  "title": "South Africa: a third of the labour force without work",
  "region": "South Africa",
  "years": "2026",
  "subtopic": "3.3 (also 3.4)",
  "concepts": [
   "unemployment rate",
   "structural unemployment",
   "hidden unemployment",
   "discouraged workers",
   "underemployment",
   "youth unemployment",
   "costs of unemployment",
   "natural rate of unemployment (NRU)"
  ],
  "hook": "South Africa's official unemployment rate hit 33.6% in Q2 2026, and counting the 3.7 million discouraged and other potential job-seekers pushes the wider rate to 43.8%.",
  "facts": [
   "Stats SA, Q2 2026: the official unemployment rate rose from 32.7% to 33.6%. The number unemployed rose by 345,000 to 8.5 million, while employment fell by 16,000 to 16.7 million.",
   "Hidden unemployment: 3.7 million discouraged job-seekers are not counted as unemployed. Adding the potential labour force gives a rate (LU3) of 43.8%, and the broadest underutilisation measure (LU4) was 46.3%.",
   "Youth (15–34) unemployment rose 1.5 percentage points to 47.4%, with 5.0 million young people unemployed.",
   "Jobs were lost in community and social services (57,000), mining (26,000), and agriculture and manufacturing (15,000 each), while the informal sector added 34,000."
  ],
  "diagram": "Structural unemployment in one labour market: demand for low-skilled labour (e.g. mining) shifts left while wages are sticky, leaving workers whose skills and location do not match the jobs. Link to the NRU: most of this unemployment is structural, so the natural rate itself is very high.",
  "evaluation": [
   "Structural more than cyclical: rates of 32.7% and 33.6% in consecutive quarters, with 47.4% youth unemployment, are far too high to be explained by the business cycle. That points to skills mismatches, the spatial legacy of apartheid and labour market rigidities, so demand-side stimulus alone would mostly raise inflation.",
   "Measurement cuts both ways: the official rate understates the problem because discouraged workers drop out (LU3 is 43.8%). But part of the Q2 rise happened because discouraged job-seekers fell by 227,000 as people started searching again, which is not purely bad news.",
   "Costs: lost output, a narrow tax base and heavy spending on grants, plus crime and social costs. Unemployment and inequality reinforce each other (see the R370 SRD grant in 3.4).",
   "Policy trade-off: supply-side fixes such as education, skills and transport take years, while public employment schemes help quickly but are costly."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Best example for types of unemployment and hidden unemployment, using official Stats SA labour underutilisation measures. Weakness: it is so extreme that it does not represent a typical economy.",
  "sources": [
   "https://www.statssa.gov.za/publications/P0211/Media%20Release%20QLFS%20Q2%202026.pdf",
   "https://www.statssa.gov.za/?p=19804"
  ],
  "mem": {
   "tag": "A third out of work",
   "story": "skills and location mismatch → 33.6% official unemployment → 3.7 million discouraged job-seekers hidden → 43.8% wider rate → youth rate 47.4%",
   "numbers": [
    [
     "33.6%",
     "official unemployment rate, Q2 2026"
    ],
    [
     "43.8%",
     "rate including the potential labour force (LU3)"
    ],
    [
     "47.4%",
     "youth (15–34) unemployment rate"
    ]
   ],
   "use": "unemployment types, structural unemployment, hidden unemployment, costs of unemployment, natural rate, inequality",
   "but": "Part of the Q2 rise came from discouraged job-seekers falling by 227,000 and starting to look for work again, so a higher rate is not purely bad news."
  }
 },
 {
  "id": "uk-second-energy-shock",
  "tk": "UKCP",
  "title": "UK: the second energy shock in four years",
  "region": "United Kingdom",
  "years": "2022–2026",
  "subtopic": "3.3 (also 3.5)",
  "concepts": [
   "cost-push inflation",
   "consumer price index (CPI)",
   "core inflation",
   "stagflation",
   "short-run Phillips curve (SRPC)",
   "inflation expectations",
   "second-round effects"
  ],
  "hook": "UK inflation hit 11.1% in October 2022 after gas prices rose about 130%. In September 2026 a new oil shock pushed it back up to 3.5%, with motor fuel prices up 29.8% in a year.",
  "facts": [
   "October 2022: CPI inflation reached 11.1%, the highest in about 41 years, with gas prices up about 130% and electricity 66% in a year. The ONS estimated CPI would have been about 13.8% without the Energy Price Guarantee. Core inflation was 6.5%.",
   "September 2026: CPI rose to 3.5% from 3.1% in August. Motor fuel prices were up 29.8% over the year, petrol hit its highest price since August 2022, and transport inflation rose to 6.6%. Core CPI was 2.8% and food inflation only 1.3%.",
   "Bank of England, September 2026: Bank Rate was held at 3.75% by six votes to three (the three wanted 4%). Brent crude was $106 a barrel and the Bank expects CPI slightly above 4% in early 2027, while unemployment is 4.9%.",
   "Ofgem's household energy price cap rose to £1,723 a year from October 2026, and is expected to rise substantially again in early 2027."
  ],
  "diagram": "Cost-push AD/AS: SRAS shifts left, so the price level rises and real GDP falls. HL: the SRPC shifts right, so inflation is higher at every unemployment rate (here 4.9% unemployment with rising inflation).",
  "evaluation": [
   "Second-round effects decide how bad it gets: in 2022 energy costs fed into wages and services prices. In September 2026 the MPC saw little evidence of that yet, which is why most members held rates. If expectations shift, a one-off cost shock becomes persistent inflation.",
   "Policy dilemma: raising rates fights inflation but deepens the output loss from a supply shock, while holding supports output but risks expectations. The six to three split shows the judgement is genuinely contested.",
   "Government cushioning: the Energy Price Guarantee cut measured CPI by about 2.7 points in 2022 (13.8% to 11.1%), but it was costly for the budget and weakened the price signal to save energy.",
   "Smaller second shock: 3.5% versus 11.1%, with core at 2.8% (6.5% in 2022) and food at 1.3%, suggests the 2026 shock is narrower, mainly oil and fuel, at least so far."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Best for cost-push inflation and the HL SRPC shift, with clean ONS and Bank of England data and a ready-made 2022 comparison. Weakness: the 2026 shock is still unfolding, so the outcome is uncertain.",
  "sources": [
   "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/september2026",
   "https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026",
   "https://www.aljazeera.com/news/2022/11/16/uk-inflation-hits-11-1-percent-highest-in-41-years",
   "https://www.icaew.com/insights/viewpoints-on-the-news/2022/nov-2022/uk-inflation-reaches-41year-high"
  ],
  "mem": {
   "tag": "Two energy shocks",
   "story": "Middle East war → Brent at $106 → motor fuel up 29.8% → CPI 3.1% to 3.5% → Bank of England holds at 3.75%, split six to three",
   "numbers": [
    [
     "11.1%",
     "UK CPI peak, October 2022"
    ],
    [
     "3.5%",
     "UK CPI, September 2026"
    ],
    [
     "29.8%",
     "annual rise in motor fuel prices, Sept 2026"
    ]
   ],
   "use": "cost-push inflation, stagflation, SRPC shifts, costs of inflation, monetary policy dilemma",
   "but": "Core CPI is only 2.8% and food inflation 1.3%, so second-round effects have not yet taken hold."
  }
 },
 {
  "id": "japan-wages-chase-prices",
  "tk": "JPWG",
  "title": "Japan: wages finally chase prices",
  "region": "Japan",
  "years": "2022–2026",
  "subtopic": "3.3 (also 3.5)",
  "concepts": [
   "inflation expectations",
   "expectations-augmented Phillips curve",
   "natural rate of unemployment (NRU)",
   "demand-pull vs cost-push inflation",
   "core inflation",
   "real wages",
   "deflation"
  ],
  "hook": "After decades of near-zero inflation, Japan's core CPI stayed at 2% or above from April 2022 to January 2026, and unions won pay rises above 5% three years in a row.",
  "facts": [
   "Core CPI (excluding fresh food) fell below 2% in February 2026 for the first time since March 2022, to 1.6%, because a gasoline tax cut and subsidies pushed energy prices down 9.1%. Core excluding energy was still 2.5%.",
   "Food went the other way: in February 2026 rice was 17.1% dearer than a year earlier and food excluding fresh food rose 5.7%.",
   "Rengo's 2026 spring wage talks (shunto) averaged 5.01%, the third year above 5% (5.25% in 2025), but only 4.69% at small unions. Real wages fell 2.8% in November 2025, the 11th straight monthly fall.",
   "September 2026: core CPI rose to 2.1% and core excluding energy to 2.4%, while services inflation was only 1.5%. Unemployment was 2.5% in August with 1.18 jobs per applicant, and the Bank of Japan raised its rate to 1.25%, the highest since 1995."
  ],
  "diagram": "HL Phillips curve: with unemployment near the natural rate (about 2.5%), rising inflation expectations shift the SRPC up while the LRPC stays vertical. AD/AS: import costs first shift SRAS left (cost-push), then wage growth adds demand-pull.",
  "evaluation": [
   "Cost-push or demand-pull? Early inflation came from import costs (energy, a weak yen, rice), which cut real wages. It only becomes self-sustaining when wages and services prices rise, and services inflation was still just 1.5% in September 2026.",
   "Expectations: decades of deflation anchored expectations near zero. Three years of 5% pay deals suggest workers and firms now expect inflation, the shifting-SRPC story in the expectations-augmented Phillips curve.",
   "Measured inflation is policy-sensitive: the gasoline tax cut pulled core CPI down to 1.6% while core excluding energy stayed at 2.5%, so headline figures can mislead about underlying pressure.",
   "Losers: with real wages falling for 11 months and small unions getting only 4.69%, pensioners and workers at small firms lost purchasing power."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Best for expectations, the HL Phillips curve and the move from deflation to inflation. Weakness: overlaps with the Unit 4 yen example, so lead with wages and expectations rather than the currency.",
  "sources": [
   "https://english.adnkronos.com/2026/03/24/japan-consumer-price-inflation-slows-below-2-pct",
   "https://english.adnkronos.com/2026/07/03/japan-unions-clinch-5-01-pct-wage-hikes-in-2026-shunto/",
   "https://english.adnkronos.com/2026/01/08/real-wages-in-japan-fall-for-11th-straight-month-in-nov/",
   "https://tradingeconomics.com/japan/core-inflation-rate/news/594376",
   "https://tradingeconomics.com/japan/unemployment-rate/news/588923",
   "https://datatrack.trendforce.com/blog/content/65731/japans-september-cpi-rises-21-yoy-meeting-expectations-core-inflation-returns-above-boj-target-after-nine-months"
  ],
  "mem": {
   "tag": "Wages chase prices",
   "story": "import costs and a weak yen → core CPI at or above 2% from April 2022 → real wages fall → shunto above 5% three years running → Bank of Japan rate 1.25%",
   "numbers": [
    [
     "5.01%",
     "average 2026 shunto pay rise"
    ],
    [
     "2.5%",
     "unemployment rate, August 2026"
    ],
    [
     "2.8%",
     "fall in real wages, November 2025"
    ]
   ],
   "use": "inflation expectations, HL Phillips curve, natural rate, demand-pull vs cost-push, costs of inflation, deflation",
   "but": "Services inflation was only 1.5% in September 2026, so wage-driven inflation is not yet fully self-sustaining."
  }
 },
 {
  "id": "brazil-bolsa-familia-tax-reform",
  "tk": "BRBF",
  "title": "Brazil: cash at the bottom, a minimum tax at the top",
  "region": "Brazil",
  "years": "2023–2026",
  "subtopic": "3.4 (also 3.6)",
  "concepts": [
   "transfer payments",
   "cash transfers",
   "progressive tax",
   "Gini coefficient",
   "Lorenz curve",
   "absolute poverty",
   "poverty trap"
  ],
  "hook": "Without Bolsa Família and other transfers, Brazil's Gini would have been 0.542 in 2024 instead of 0.504, and since January 2026 incomes up to R$5,000 a month pay no income tax while top earners face a 10% minimum.",
  "facts": [
   "IBGE (December 2025): poverty fell from 27.3% in 2023 to 23.1% in 2024, and extreme poverty from 4.4% to 3.5%, the lowest since the series began in 2012 (World Bank lines of $6.85 and $2.15 a day). More than 8.6 million people left poverty.",
   "IBGE estimates that without transfers such as Bolsa Família and the BPC pension, the 2024 Gini would have been 0.542 rather than 0.504.",
   "Bolsa Família pays at least R$600 a month per family, with extras for children and pregnant women. In February 2026 it reached 18.84 million families with an average of R$690.01, about R$13bn a month (early 2019: 13.8 million families, average R$187.91).",
   "Law 15,270 (signed 26 November 2025): from January 2026 monthly incomes up to R$5,000 are exempt from income tax, benefiting about 15 million people. It is funded by a minimum tax rising to 10% on incomes above R$1.2 million a year and a 10% withholding tax on dividends above R$50,000 a month.",
   "Inequality rose again in 2025: the Gini went up to 0.511, as incomes of the richest 10% grew 8.7% against 3.1% for the poorest 10%."
  ],
  "diagram": "Lorenz curve: draw the pre-transfer curve further from the line of equality (Gini 0.542) and the post-transfer curve closer to it (0.504), so area A shrinks.",
  "evaluation": [
   "Transfers vs jobs: IBGE credits jobs mainly for the fall in poverty and benefits mainly for the fall in extreme poverty, so cash transfers work fastest at the very bottom.",
   "Progressive tax design: the exemption costs about R$25.8bn in 2026 against R$34.1bn expected from the minimum tax, which hits only about 0.13% of taxpayers. Risk: the rich may restructure income to avoid it.",
   "Cost and incentives: R$13bn a month has an opportunity cost, and means-tested benefits can create a poverty trap if they are withdrawn as earnings rise.",
   "Fragile gains: the Gini rising to 0.511 in 2025 shows that faster income growth at the top can undo part of the redistribution."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The strongest all-round 3.4 example: transfers, a new progressive tax, Lorenz/Gini and absolute poverty with official IBGE data. Weakness: it is hard to separate the effect of transfers from a strong labour market.",
  "sources": [
   "https://jovempan.com.br/noticias/brasil/mais-de-86-milhoes-de-brasileiros-deixaram-pobreza-em-2024-aponta-ibge.html",
   "https://www.tnh1.com.br/noticia/nid/mais-de-86-milhoes-deixam-pobreza-brasil-tem-melhor-nivel-desde-2012/",
   "https://www.poder360.com.br/poder-governo/bolsa-familia-volta-a-crescer-em-2026-depois-de-queda-em-2025/",
   "https://www.mayerbrown.com/de/insights/publications/2025/12/enactment-of-law-no-15270-2025-which-establishes-dividend-taxation-expands-the-exemption-threshold-and-introduces-a-minimum-tax-on-high-incomes",
   "https://exame.com/brasil/lula-sanciona-isencao-do-imposto-de-renda-para-salarios-de-ate-r-5-mil",
   "https://www.tribunadosertao.com.br/financas/2026/05/08/898808-desigualdade-de-renda-volta-a-crescer-em-2025-aponta-ibge"
  ],
  "mem": {
   "tag": "Cash down, tax up",
   "story": "Bolsa Família floor of R$600 → poverty 23.1% and extreme poverty 3.5% (2024) → Gini 0.504 instead of 0.542 → 2026 tax law: zero up to R$5,000, 10% minimum at the top",
   "numbers": [
    [
     "0.504",
     "Brazil's Gini with transfers, 2024"
    ],
    [
     "0.542",
     "Gini without transfers, 2024"
    ],
    [
     "R$5,000",
     "monthly income now exempt from income tax"
    ]
   ],
   "use": "transfer payments, progressive tax, Lorenz curve and Gini, absolute poverty, policies to reduce inequality",
   "but": "The Gini rose back to 0.511 in 2025 as the richest 10% saw incomes grow 8.7% against 3.1% for the poorest 10%."
  }
 },
 {
  "id": "south-africa-inequality-srd-grant",
  "tk": "SAGR",
  "title": "South Africa: R370 a month and the basic income debate",
  "region": "South Africa",
  "years": "2020–2026",
  "subtopic": "3.4 (also 3.6)",
  "concepts": [
   "Gini coefficient",
   "Lorenz curve",
   "wealth inequality",
   "causes of inequality (discrimination, resource ownership)",
   "transfer payments",
   "universal basic income (UBI)",
   "opportunity cost"
  ],
  "hook": "In a country where the top 10% own more than 80% of the wealth, millions of adults rely on a R370-a-month grant brought in during Covid-19, and the government is now debating turning it into a basic income grant.",
  "facts": [
   "World Bank (2022): South Africa ranked first of 164 countries for inequality, the top 10% owned more than 80% of wealth, and race (ethnicity) explained about 41% of income inequality.",
   "World Bank data: South Africa's consumption Gini was 0.65 in 2005, 0.596 in 2014 and 0.541 in the 2022 survey.",
   "The Social Relief of Distress (SRD) grant of R370 a month began during Covid-19. Budget 2026 froze its value and added R36.4bn to fund it for another year, for about 8.2 million beneficiaries.",
   "October 2026: reports put recipients at about 13 million. Treasury says a High Court ruling, which the government is appealing, could add three million recipients and more than double the annual cost to R74bn. The Department of Social Development is refining a plan for a basic income grant to replace it."
  ],
  "diagram": "Lorenz curve bowed far from the line of equality (Gini 0.54–0.65 depending on the survey year), with transfers such as the SRD grant pulling the bottom of the curve up.",
  "evaluation": [
   "Measurement: the fall from 0.596 to 0.541 partly reflects a new survey, and consumption Ginis are lower than income Ginis, so compare like with like before calling any country the most unequal.",
   "UBI trade-off: a universal grant avoids means-testing, fraud checks (Treasury reports applicants understating income) and the poverty trap, but costs far more; expanding the SRD alone could push the cost to R74bn.",
   "Root causes: inequality comes from unequal ownership of wealth and land, apartheid's legacy in education and location, and 33.6% unemployment. Cash eases the symptoms, while human capital and jobs address the causes.",
   "Opportunity cost: Treasury calls SRD expansion one of the biggest risks to the budget, so more cash may mean less spending on health, education or infrastructure."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Best for Lorenz/Gini, the causes of inequality and a live UBI debate in an emerging economy. Weakness: Gini figures and recipient counts differ by source, so quote them with the year and source.",
  "sources": [
   "https://www.africanews.com/amp/2022/03/10/world-bank-south-africa-is-the-most-unequal-country-in-the-world/",
   "https://api.worldbank.org/v2/country/ZAF/indicator/SI.POV.GINI?format=json",
   "https://www.businessday.co.za/news/2026-02-25-budget-r370-srd-grant-continues-for-another-year-but-value-is-frozen/",
   "https://www.ewn.co.za/2026/10/22/srd-grant-extended-for-another-year-despite-treasury-saying-expanding-the-scheme-is-risky"
  ],
  "mem": {
   "tag": "R370 and rising",
   "story": "apartheid legacy and 33.6% unemployment → top 10% own over 80% of wealth → R370 SRD grant for millions → court ruling could lift cost to R74bn → basic income grant debate",
   "numbers": [
    [
     "80%",
     "share of wealth owned by the top 10%"
    ],
    [
     "R370",
     "monthly SRD grant"
    ],
    [
     "R74bn",
     "possible annual SRD cost after the court ruling"
    ]
   ],
   "use": "Lorenz curve and Gini, causes of inequality, transfer payments, universal basic income, opportunity cost",
   "but": "Treasury warns the expansion could more than double the annual cost to R74bn, and reports fraud by applicants understating income."
  }
 },
 {
  "id": "spain-minimum-wage-rises",
  "tk": "ESMW",
  "title": "Spain: a 66% minimum wage rise in eight years",
  "region": "Spain",
  "years": "2018–2026",
  "subtopic": "3.4 (also 3.3)",
  "concepts": [
   "minimum wage",
   "price floor",
   "in-work and relative poverty",
   "unemployment",
   "youth unemployment",
   "equity vs efficiency"
  ],
  "hook": "Spain raised its minimum wage from €735.90 a month in 2018 to €1,221 in 2026, a rise of about 66%, while unemployment fell from 14.45% to about 10%.",
  "facts": [
   "The minimum wage (SMI, paid in 14 instalments) was €735.90 a month in 2018, rose 22% in 2019, reached €1,184 in 2025 and €1,221 in 2026 (+3.1%), about 66% above 2018. The Labour Ministry says about 2.5 million workers are affected.",
   "The 2026 rise was agreed between Labour Minister Yolanda Díaz and the trade unions; employers' organisations did not sign.",
   "Bank of Spain (2021): the 22% rise in 2019 cut employment growth among directly affected workers by 6–11 percentage points, equal to 0.6–1.1% of total wage employment, with bigger effects for young workers and in agriculture.",
   "INE: unemployment was 14.45% in Q4 2018 and 10.18% in Q3 2026. Eurostat: Spain's 10.0% in August 2026 was the highest in the EU (average 6.1%), with youth unemployment at 22.7% against 15.4%."
  ],
  "diagram": "Labour market with a minimum wage above equilibrium (a price floor): quantity of labour supplied exceeds quantity demanded, showing possible unemployment. Note that with inelastic labour demand the job loss is small.",
  "evaluation": [
   "Mixed evidence: total unemployment fell after the rises, but the Bank of Spain finds slower job growth among the workers directly affected. A falling total does not prove no harm, because unemployment might have fallen even further without the rises.",
   "Winners and losers: about 2.5 million low-paid workers gain, reducing in-work and relative poverty, while young and low-skilled workers in low-productivity sectors such as agriculture carry most of the job risk.",
   "Targeting: a minimum wage helps people in work, not the unemployed or inactive, so it does less for the poorest than transfers. It costs the government nothing directly, which makes it politically attractive.",
   "Context: Spain's high unemployment (still the EU's highest) predates the rises, so it is mainly structural rather than caused by the minimum wage."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Best for the minimum wage debate, with official before-and-after data and a central bank study to weigh. Weakness: the job effect is hard to separate from Spain's strong post-Covid recovery.",
  "sources": [
   "https://lepetitjournal.com/madrid/emploi/salaire-minimum-espagne-1221-euros-2026-435234",
   "https://www.fieldfisher.com/es-es/locations/espana/actualidad/salario-minimo-interprofesional-2026",
   "https://elderecho.com/la-subida-del-smi-ocasiono-a-sus-perceptores-una-perdida-de-empleo-de-hasta-11-puntos-segun-banco-de-espana",
   "https://www.ine.es/daco/daco42/daco4211/epa0418.pdf",
   "https://ine.es/dyngs/Prensa/en/EPA3T26.htm",
   "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/une_rt_m?geo=ES&geo=EU27_2020&age=Y_LT25&age=TOTAL&sex=T&s_adj=SA&unit=PC_ACT&time=2026-08"
  ],
  "mem": {
   "tag": "Minimum wage up 66%",
   "story": "€735.90 minimum wage in 2018 → 22% jump in 2019 → €1,221 by 2026 → Bank of Spain finds slower job growth for affected workers → unemployment still falls to about 10%",
   "numbers": [
    [
     "€1,221",
     "monthly minimum wage, 2026 (14 payments)"
    ],
    [
     "66%",
     "rise in the minimum wage since 2018"
    ],
    [
     "10.18%",
     "Spanish unemployment, Q3 2026"
    ]
   ],
   "use": "minimum wage, policies to reduce poverty, equity vs efficiency, structural and youth unemployment",
   "but": "The Bank of Spain estimates the 2019 rise cut job growth for affected workers by 6–11 percentage points."
  }
 },
 {
  "id": "kenya-cash-transfers-ubi",
  "tk": "KEUBI",
  "title": "Kenya: what happens when you just give people cash",
  "region": "Kenya",
  "years": "2018–2025",
  "subtopic": "3.4",
  "concepts": [
   "universal basic income (UBI)",
   "cash transfers",
   "absolute poverty",
   "work incentives",
   "human capital",
   "poverty trap"
  ],
  "hook": "In about 200 Kenyan villages, adults get $22.50 a month (about $0.75 a day) in the world's largest basic income trial, some for 12 years, and it has not made people work less.",
  "facts": [
   "GiveDirectly's study began in 2018: some villages get $22.50 a month per adult for 12 years, others for 2 years, and others a $500 lump sum, compared with control villages. About half of residents lived below Kenya's extreme poverty line of about $33 a month.",
   "2023 results (first two years): no net fall in household labour supply. Hours moved from farm wage work to self-employment, savings and savings-club use rose, and drinking did not increase.",
   "The lump sum raised household income by about 50% of the control group's income and created more new businesses than two years of monthly payments, while the 12-year group invested more.",
   "A 2025 study of one-off $1,000 transfers to 10,500 households in Siaya county (paid 2014–2017) found 48% fewer infant deaths and 45% fewer under-5 deaths. An earlier study found a local spillover of about 2.5 times each dollar transferred."
  ],
  "diagram": "Lorenz curve moving towards the line of equality as the poorest incomes rise. Optional: AD shifting right in the villages to show the local multiplier of about 2.5.",
  "evaluation": [
   "Work incentives: the classic objection to UBI is that people stop working. Kenya's evidence shows labour supply did not fall overall, though it shifted between activities.",
   "Design matters: lump sums built more businesses, while regular payments supported food security and mental health, so the best design depends on the goal.",
   "Scale and cost: this is a charity trial in poor rural villages. Kenya spent about $93 per person on social programmes, so a national UBI would be far beyond its budget.",
   "External validity: results from villages where everyone gets cash, with local spillovers, may not carry over to cities or to rich countries with existing welfare systems."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "The best evidence-based UBI example, with randomised trial results. Weakness: the main UBI results are from 2023 and it is an NGO trial, not government policy.",
  "sources": [
   "https://www.givedirectly.org/2023-ubi-results/",
   "https://www.npr.org/sections/goatsandsoda/2023/12/07/1217478771/its-one-of-the-biggest-experiments-in-fighting-global-poverty-now-the-results-ar",
   "https://cega.berkeley.edu/article/cash-transfers-cut-infant-mortality/",
   "https://www.givedirectly.org/kenya"
  ],
  "mem": {
   "tag": "Just give cash",
   "story": "$22.50 a month for up to 12 years → no fall in work → more saving and small businesses → lump sums build firms → infant deaths down 48% in a related trial",
   "numbers": [
    [
     "$22.50",
     "monthly payment per adult (about $0.75 a day)"
    ],
    [
     "12 years",
     "length of the long-term basic income arm"
    ],
    [
     "48%",
     "fall in infant deaths, Siaya study (2025)"
    ]
   ],
   "use": "universal basic income, cash transfers, absolute poverty, work incentives, human capital",
   "but": "It is a charity trial in poor rural villages, and Kenya spent only about $93 per person on social programmes, so a national UBI is unaffordable."
  }
 },
 {
  "id": "turkey-monetary-u-turn",
  "tk": "TCMB",
  "title": "Turkey's U-turn: from 8.5% to 50% interest rates",
  "region": "Turkey",
  "years": "2022–2026",
  "subtopic": "3.5 (also 3.3)",
  "concepts": [
   "Contractionary (tight) monetary policy",
   "Central bank minimum lending rate",
   "Real interest rate",
   "Inflation targeting",
   "Central bank independence",
   "Time lags"
  ],
  "hook": "Turkey kept its policy rate at 8.5% while inflation hit 85.51%, then raised it to 50%. By September 2026 inflation had fallen to 29.73%.",
  "facts": [
   "Inflation reached 85.51% in October 2022 under a low-rate policy, and the one-week repo rate was still only 8.5% in June 2023, a deeply negative real interest rate.",
   "After the May 2023 election a new team reversed course: the rate rose from 8.5% to 15% on 22 June 2023 and reached 50% on 21 March 2024 after a surprise 5-point hike.",
   "Inflation peaked above 75% in May 2024. When political turmoil hit the lira in March–April 2025, the central bank sold about $50bn of reserves and raised the rate back up to 46%.",
   "Annual CPI inflation fell to 29.73% in September 2026, and on 22 October 2026 the bank cut the policy rate from 37% to 36%, a real rate of about +6 percentage points.",
   "After the 2026 Middle East energy shock the bank raised its end-2026 interim inflation target from 16% to 24% (May 2026). Its medium-term target is still 5%."
  ],
  "diagram": "Money market: Sm shifts left (or the policy rate is raised), so the interest rate rises from i1 to i2. Then AD/AS: AD shifts left, so the price level (inflation) falls and real GDP drops below Yp, showing the cost of disinflation.",
  "evaluation": [
   "Winners and losers: savers and lira holders gain from a positive real rate. Borrowers, firms and growth lose, and the bank itself cites soft domestic demand in 2026.",
   "Time lags: the first hike came in June 2023 but inflation only peaked in May 2024, almost a year later, so rates had to stay high through the lag.",
   "Credibility is slow to build: in 2026 inflation was still about six times the 5% target, and the 2025 political shock forced an emergency hike, so independence can be questioned.",
   "Monetary policy cannot fix cost-push inflation: the 2026 energy shock pushed the interim target from 16% to 24% even with a 37% policy rate."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best all-round case for real interest rates, inflation targeting and why central bank independence matters. Weakness: many numbers to keep straight, and the Unit 4 bank already uses Turkey for the lira, so stick to the interest rate angle.",
  "sources": [
   "https://www.dailysabah.com/business/economy/turkiyes-annual-inflation-up-in-october-to-reach-855/amp",
   "https://www.centralbanking.com/node/7959089",
   "https://www.euronews.com/2024/03/21/turkey-hikes-interest-rate-to-50-in-surprise-move",
   "https://finance.yahoo.com/news/turkish-cenbank-surprises-rate-hike-115015498.html",
   "https://turkishminute.com/2026/07/23/turkeys-central-bank-keeps-policy-rate-at-37-percent/amp/",
   "https://www.tcmb.gov.tr/wps/wcm/connect/EN/TCMB+EN/Main+Menu/Announcements/Press+Releases/2026/ANO2026-45",
   "https://www.tcmb.gov.tr/wps/wcm/connect/EN/TCMB%20EN/Main%20Menu/Statistics/Inflation%20Data"
  ],
  "mem": {
   "tag": "Eight-and-a-half to fifty",
   "story": "Rates held at 8.5% while inflation hit 85.51% → June 2023 U-turn, rate up to 50% by March 2024 → inflation peaks above 75% then falls → 29.73% by September 2026 → cuts begin, 36% in October 2026",
   "numbers": [
    [
     "85.51%",
     "inflation peak, October 2022"
    ],
    [
     "50%",
     "peak policy rate, March 2024"
    ],
    [
     "29.73%",
     "inflation, September 2026"
    ]
   ],
   "use": "contractionary monetary policy, real interest rate, inflation targeting, central bank independence, time lags",
   "but": "Even after three years of tight money, inflation was still about six times the 5% target, and an energy shock forced the end-2026 target up from 16% to 24%."
  }
 },
 {
  "id": "ecb-hike-cut-hike-energy-shock",
  "tk": "ECBU",
  "title": "The ECB: hike, cut, then hike again",
  "region": "Eurozone",
  "years": "2022–2026",
  "subtopic": "3.5 (also 3.3)",
  "concepts": [
   "Inflation targeting",
   "Contractionary (tight) monetary policy",
   "Expansionary (loose) monetary policy",
   "Cost-push inflation",
   "Time lags",
   "Transmission mechanism"
  ],
  "hook": "The ECB took its deposit rate from 0% to 4%, cut it back to 2% by June 2025, then had to raise it again to 2.50% in September 2026 when an energy shock pushed eurozone inflation to 3.8%.",
  "facts": [
   "The ECB raised its deposit facility rate from 0.00% in July 2022 to 4.00% in September 2023, ten hikes in a row, to fight post-pandemic and energy inflation.",
   "It then cut eight times, from June 2024 to June 2025, taking the deposit rate back down to 2.00%.",
   "After the 2026 Middle East energy shock it hiked to 2.25% (effective 17 June 2026) and 2.50% (effective 16 September 2026).",
   "Eurozone inflation hit 3.8% in September 2026, its highest since September 2023, with energy inflation at 18.8% but core inflation only 2.5%.",
   "ECB staff (10 September 2026) projected inflation of 3.0% in 2026, falling to 2.1% in 2028, with real GDP growth of only 0.9% in 2026."
  ],
  "diagram": "AD/AS with a cost-push shock: SRAS shifts left (higher energy costs), so the price level rises and real GDP falls. Then show the ECB's hike shifting AD left: inflation falls back but real GDP falls further, the policy dilemma.",
  "evaluation": [
   "Cost-push dilemma: raising rates cannot lower oil prices. It only stops energy costs spreading into wages and core prices, at the price of weaker growth (0.9% in 2026).",
   "Time lags: hikes in 2026 hit demand in 2027, when the energy shock may have faded, so the ECB risks tightening into a slowdown.",
   "One rate for twenty economies: energy-importing members feel the shock more than others, but all face the same interest rate.",
   "Defence of hiking: core inflation was 2.5%, above the 2% target, and the 2022 lesson was that acting late lets inflation expectations rise."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Excellent for the full rate cycle and for the 'monetary policy cannot fix cost-push inflation' evaluation point. Weakness: the next decision is on 29 October 2026, so check whether rates have moved again.",
  "sources": [
   "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html",
   "https://www.ecb.europa.eu/press/projections/html/index.en.html",
   "https://tradingeconomics.com/euro-area/inflation-cpi/news/592744",
   "https://gmk.center/en/news/inflation-in-the-eurozone-accelerated-to-3-8-in-september/",
   "https://www.newsquawk.com/headlines/ecb-staff-projections-2026-headline-hicp-maintained-at-30-but-raises-2027-and-2028-hicp-forecasts"
  ],
  "mem": {
   "tag": "Up, down, up again",
   "story": "Inflation surge → deposit rate 0% to 4% (2022–2023) → eight cuts to 2% by June 2025 → 2026 energy shock pushes inflation to 3.8% → hikes to 2.50% despite 0.9% growth",
   "numbers": [
    [
     "4.00%",
     "peak deposit rate, September 2023"
    ],
    [
     "2.50%",
     "deposit rate after September 2026 hike"
    ],
    [
     "3.8%",
     "eurozone inflation, September 2026"
    ]
   ],
   "use": "inflation targeting, cost-push inflation, time lags, contractionary vs expansionary monetary policy, limits of monetary policy",
   "but": "With energy inflation at 18.8% but core only 2.5%, most of the inflation came from supply, so higher rates mainly cut output (growth 0.9%)."
  }
 },
 {
  "id": "japan-ends-negative-rates",
  "tk": "BOJX",
  "title": "Japan ends negative interest rates",
  "region": "Japan",
  "years": "2024–2026",
  "subtopic": "3.5 (also 3.3)",
  "concepts": [
   "Contractionary (tight) monetary policy",
   "Quantitative easing (QE)",
   "Open market operations",
   "Real interest rate",
   "Inflation targeting",
   "Central bank minimum lending rate"
  ],
  "hook": "In March 2024 the Bank of Japan ended eight years of negative interest rates. By September 2026 it had raised its rate to 1.25%, the highest since 1995, yet the real rate was still negative.",
  "facts": [
   "On 19 March 2024 the Bank of Japan ended negative rates and yield curve control, moving its short-term policy rate from -0.1% to a range of 0–0.1%, judging the 2% price target was in sight.",
   "It raised the rate to 0.25% in July 2024 and kept hiking to 0.75% (December 2025), 1.0% (June 2026) and 1.25% (18 September 2026, a 7–2 vote).",
   "In July 2024 it also began reversing QE: monthly government bond purchases are cut by about ¥400bn each quarter, to about ¥3 trillion a month by January–March 2026.",
   "Core CPI inflation (excluding fresh food) was 2.1% in September 2026, so the real policy rate was still about -0.85% (1.25% minus 2.1%). The BoJ itself says real rates remain low."
  ],
  "diagram": "Money market: Sm shifts left (fewer bond purchases), so the interest rate rises from i1 to i2. AD/AS: a small leftward shift of AD from a position close to Yp; stress that with a negative real rate policy is still loose, just less so.",
  "evaluation": [
   "Nominal vs real: at 1.25% the rate looks tight for Japan, but with inflation at 2.1% the real rate is still negative, so policy still supports demand.",
   "Gradualism: hikes of 0.25 points spread over more than two years limit the shock to borrowers, firms and a government with a very large debt.",
   "Mixed causes: the BoJ cites oil prices and a weak yen, which are cost-push factors. Hiking helps the yen but cannot lower world oil prices.",
   "Winners and losers: savers and banks gain from positive rates after years near zero, while the government faces higher interest payments on its debt."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "The clearest exit from QE and negative rates, and good for the real interest rate formula. Weakness: Japan's bond-market story overlaps with the 3.6 fiscal case, and the yen angle is already in the Unit 4 bank.",
  "sources": [
   "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2024/k240319a.pdf",
   "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2024/k240731a.pdf",
   "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260616a.pdf",
   "https://www.boj.or.jp/en/mopo/mpmdeci/mpr_2026/k260918a.pdf",
   "https://www.focus-economics.com/countries/japan/news/monetary-policy/japan-central-bank-meeting-23-01-2026-bank-of-japan-leaves-rates-unchanged-in-january/",
   "https://tradingeconomics.com/japan/core-inflation-rate/news/594376",
   "https://www.nationthailand.com/news/40071184"
  ],
  "mem": {
   "tag": "Goodbye minus 0.1",
   "story": "Wages and prices finally rise → March 2024: rate -0.1% to 0–0.1% → bond buying cut toward ¥3 trillion a month → steady 0.25-point hikes → 1.25% in September 2026, real rate still negative",
   "numbers": [
    [
     "-0.1%",
     "policy rate before March 2024"
    ],
    [
     "1.25%",
     "policy rate, September 2026, highest since 1995"
    ],
    [
     "2.1%",
     "core CPI, September 2026"
    ]
   ],
   "use": "monetary policy tools, QE and its reversal, real interest rate, inflation targeting, gradual tightening",
   "but": "With core inflation at 2.1%, a 1.25% policy rate is still a negative real rate, so 'tightening' has not yet made policy tight."
  }
 },
 {
  "id": "china-pushing-on-a-string",
  "tk": "PBOC",
  "title": "China: cheap money nobody wants to borrow",
  "region": "China",
  "years": "2024–2026",
  "subtopic": "3.5 (also 3.2, 3.3)",
  "concepts": [
   "Expansionary (loose) monetary policy",
   "Minimum reserve requirement",
   "Liquidity trap",
   "Low consumer and business confidence",
   "Real interest rate",
   "Transmission mechanism"
  ],
  "hook": "China cut interest rates and bank reserve requirements, yet in July 2026 new bank loans shrank by 340 billion yuan, the biggest monthly fall on record: a textbook case of pushing on a string.",
  "facts": [
   "In May 2025 the People's Bank of China cut its 7-day reverse repo rate from 1.5% to 1.4% and the reserve requirement ratio by 0.5 points, releasing about 1 trillion yuan of liquidity.",
   "The 1-year loan prime rate fell to 3.0% (5-year: 3.5%) in May 2025 and was held there for 17 straight months to October 2026.",
   "Consumer prices fell 0.3% year on year in September 2025 and producer prices fell 2.3%, so deflation raised the real cost of borrowing.",
   "In July 2026 new yuan loans contracted by 340 billion yuan, the largest monthly fall on record, and outstanding loan growth slowed to a record-low 5.1%. Household loans fell 460.3 billion yuan."
  ],
  "diagram": "Money market: Sm shifts right (RRR cut), so the interest rate falls a little. Then AD/AS: AD barely moves because C and I do not respond (low confidence, property slump). Label it 'pushing on a string' or liquidity trap.",
  "evaluation": [
   "Confidence matters more than price: Capital Economics noted loan demand fell even though lending rates kept edging down, because households are cutting debt after the property slump.",
   "Real vs nominal: with CPI near zero (0.9% in September 2026), a 3.0% loan rate is a real rate of about 2%, much higher than it looks.",
   "Stronger case for fiscal policy: when monetary policy is weak, government spending or transfers can raise AD directly.",
   "Caveat for 2026: the oil shock pushed producer prices up 5.0% in September 2026, so the deflation story has partly turned, though consumer demand is still weak."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "The best example of the limits of monetary policy: low confidence, the liquidity trap and the RRR as a tool. Weakness: China's rates are not near zero, so call it liquidity-trap style, not a strict liquidity trap.",
  "sources": [
   "https://english.www.gov.cn/news/202505/07/content_WS681af001c6d0868f4e8f2509.html",
   "https://tradingeconomics.com/china/reverse-repo-rate/news/457774",
   "https://tradingeconomics.com/china/interest-rate/news/593249",
   "https://www.mysteel.net/news/5101054-nbs-chinas-sept-cpi-falls-03-ppi-down-23-yoy",
   "https://kfgo.com/2026/08/14/china-july-bank-loans-contract-for-second-time-in-2026-on-weak-demand/",
   "https://www.stats.gov.cn/english/PressRelease/202610/t20261015_1965500.html",
   "https://www.stats.gov.cn/english/PressRelease/202610/t20261015_1965499.html"
  ],
  "mem": {
   "tag": "Pushing on a string",
   "story": "Property slump and deflation → PBoC cuts rates and RRR in May 2025 → loan rate held at a record-low 3.0% → households keep repaying debt → new loans shrink 340 billion yuan in July 2026",
   "numbers": [
    [
     "1.4%",
     "7-day reverse repo rate from May 2025"
    ],
    [
     "3.0%",
     "1-year loan prime rate, held 17 months"
    ],
    [
     "340 billion yuan",
     "fall in new loans, July 2026"
    ]
   ],
   "use": "limits of monetary policy, liquidity trap, low confidence, reserve requirement, real interest rate, case for fiscal policy",
   "but": "Rates are 1.4% rather than zero and the PBoC chose small cuts, so weak lending also reflects cautious policy, not only a true liquidity trap."
  }
 },
 {
  "id": "germany-debt-brake-reform",
  "tk": "BREMS",
  "title": "Germany loosens its debt brake",
  "region": "Germany",
  "years": "2025–2026",
  "subtopic": "3.6 (also 3.2, 3.7)",
  "concepts": [
   "Expansionary fiscal policy",
   "Capital expenditure",
   "Budget deficit",
   "Government (public) debt",
   "Keynesian multiplier",
   "Crowding out"
  ],
  "hook": "In March 2025 Germany changed its constitution to allow a €500bn infrastructure fund and unlimited defence borrowing above 1% of GDP, but a year later the ifo institute found about 95% of the new debt had not added any investment.",
  "facts": [
   "On 18 March 2025 the Bundestag (512 votes to 206) amended the constitution to create a €500bn special fund over 12 years and exempt defence spending above 1% of GDP from the debt brake. States may borrow 0.35% of GDP.",
   "The fund splits into €300bn for federal infrastructure, €100bn for the Climate and Transformation Fund and €100bn for the states.",
   "Real GDP grew only 0.2% in 2025 after two years of contraction, and the debt ratio rose from 62.2% to 63.5% of GDP.",
   "ifo found that in 2025 the fund provided €24.3bn of extra money but investment rose only €1.3bn on 2024, because planned core-budget projects were moved into the fund (about 95% not additional; IW estimate 86%).",
   "In October 2026 the government raised its 2026 growth forecast to 1.3%, from 0.5% in April."
  ],
  "diagram": "Keynesian AS with a large horizontal and upward section: AD shifts right from higher G (capital expenditure), with a multiplier shift from AD2 to AD3. Add LRAS (or the vertical part of the Keynesian AS) shifting right in the long run because infrastructure raises capacity.",
  "evaluation": [
   "Fiscal space: with debt at 63.5% of GDP, far below the UK's 94.3% or Japan's 206.5%, Germany can afford more borrowing without a debt-sustainability scare.",
   "Weak multiplier if not additional: if borrowed money just replaces planned spending (ifo: 95%), the net injection and the multiplier effect are small.",
   "Capital vs current spending: real infrastructure raises both AD and LRAS, but if the core budget is freed up for consumption spending, the long-run supply benefit is lost.",
   "Time lags and leakages: planning and building take years, and defence equipment is often imported, a large MPM that shrinks the multiplier."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best 2025–26 case for discretionary expansionary fiscal policy, capital spending and fiscal rules, with a strong 'is it additional?' evaluation point. Weakness: growth effects are still mostly forecasts.",
  "sources": [
   "https://www.oppenhoff.eu/en/news/detail/bundestag-adopts-historic-fiscal-package-including-amendment-to-the-german-constitution",
   "https://www.cleanenergywire.org/news/economists-business-leaders-warn-misuse-one-year-after-germany-adopted-eu500bn-special-fund",
   "https://www.thelocal.de/20260317/economists-warn-german-government-is-misusing-investment-spending",
   "https://www.bundesbank.de/en/press/press-releases/deutsche-staatsschulden-992720",
   "https://www.lbbw.de/artikel/news-und-einschaetzungen-2026/bip-deutschland-2025_ak9u6ptgx6_d.html",
   "https://www.newsquawk.com/headlines/german-government-raised-its-2026-gdp-growth-forecast-to-13-prev-05-in-april-also-lifts-2027-view-to-11-prev-09-and-sees-06-growth-in-2028"
  ],
  "mem": {
   "tag": "Brakes off, money moved",
   "story": "Two years of recession → March 2025 debt-brake reform and €500bn fund → borrowing rises but projects shifted from core budget → investment up only €1.3bn → growth forecast 1.3% for 2026",
   "numbers": [
    [
     "€500bn",
     "infrastructure special fund over 12 years"
    ],
    [
     "1% of GDP",
     "defence spending above this is exempt"
    ],
    [
     "95%",
     "share of 2025 fund money not additional (ifo)"
    ]
   ],
   "use": "expansionary fiscal policy, capital expenditure, fiscal rules and debt, Keynesian multiplier, fiscal policy and LRAS",
   "but": "ifo found €24.3bn of fund money in 2025 raised investment by only €1.3bn, so the real stimulus was far smaller than the headline."
  }
 },
 {
  "id": "argentina-milei-chainsaw",
  "tk": "MILEI",
  "title": "Argentina's chainsaw: from deficit to surplus",
  "region": "Argentina",
  "years": "2023–2026",
  "subtopic": "3.6 (also 3.2, 3.3)",
  "concepts": [
   "Contractionary fiscal policy",
   "Budget surplus",
   "Budget deficit",
   "Government (public) debt",
   "Current expenditure",
   "Capital expenditure"
  ],
  "hook": "President Milei turned a primary deficit of 2.9% of GDP into a 1.8% surplus in a single year by cutting spending, Argentina's first overall surplus since 2010, at the cost of a 1.7% recession.",
  "facts": [
   "The primary balance swung from a deficit of 2.9% of GDP in 2023 to a surplus of 1.8% in 2024, and the overall (financial) balance was a 0.3% surplus, the first since 2010.",
   "Cuts fell hardest on capital spending and subsidies: in the first half of 2024 public works spending fell 74.4% and energy subsidies 81.2% in real terms (CEPA).",
   "Real GDP shrank about 1.7% in 2024, then grew 4.4% in 2025 (preliminary). Poverty fell from 52.9% in the first half of 2024 to 31.6% a year later (INDEC).",
   "A second surplus followed in 2025: a primary surplus of 1.4% of GDP and an overall surplus of 0.2%, with primary spending 27% lower in real terms than in 2023.",
   "Annual inflation was 33.4% in September 2026, with monthly inflation of 1.9%."
  ],
  "diagram": "AD/AS: AD shifts left from lower G (contractionary fiscal policy), so the price level falls (lower inflation) and real GDP falls, creating a recessionary gap in 2024. Then show recovery as confidence and AD return in 2025.",
  "evaluation": [
   "Short run vs long run: the 2024 recession (about -1.7%) was the short-run cost; lower inflation and a return to 4.4% growth in 2025 support the long-run case.",
   "Credibility: ending money-financed deficits was the anchor for falling inflation, a case where cutting the deficit may raise confidence.",
   "Quality of cuts: slashing public works by 74.4% lowers future LRAS, which the OECD warns can hurt infrastructure and productivity growth.",
   "Losers: pensioners and subsidy users bore much of the adjustment, and inflation was still 33.4% in 2026, so the job is not finished."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best example of contractionary fiscal policy and a budget surplus in an emerging economy, with clear winners and losers. Weakness: the fall in inflation also depended on exchange-rate and monetary measures, so do not credit fiscal policy alone.",
  "sources": [
   "https://www.oecd.org/en/publications/oecd-economic-surveys-argentina-2025_27dd6e27-en/full-report/executive-summary_bca47c5e.html",
   "https://www.bloomberg.com/news/articles/2025-01-17/milei-s-chainsaw-nets-argentina-first-surplus-in-over-a-decade",
   "https://bnamericas.com/en/analysis/how-mileis-spending-cuts-are-footing-the-bill-for-argentinas-fiscal-surplus",
   "https://www.argusmedia.com/pt/news-and-insights/latest-market-news/2792584-argentina-s-economy-swings-to-growth-in-2025",
   "https://www.noticiasnqn.com.ar/amp/noticias/2025/09/25/320808-la-pobreza-en-argentina-cayo-al-31_6por_ciento-en-el-primer-semestre-de-2025",
   "https://buenosairesherald.com/economics/argentina-posted-fiscal-surplus-of-1-4-of-gdp-in-2025",
   "https://macaubusiness.com/argentina-records-2nd-annual-budget-surplus-in-a-row/",
   "https://batimes.com.ar/news/economy/argentina-inflation-ticks-up-19-in-september-lifting-annual-rate-to-334.phtml"
  ],
  "mem": {
   "tag": "The chainsaw surplus",
   "story": "Chronic deficits and very high inflation → deep spending cuts in 2024 → primary balance from -2.9% to +1.8% of GDP → recession of about 1.7% in 2024 → 4.4% growth in 2025",
   "numbers": [
    [
     "1.8%",
     "primary surplus, % of GDP, 2024"
    ],
    [
     "74.4%",
     "real fall in public works spending, H1 2024"
    ],
    [
     "4.4%",
     "GDP growth, 2025"
    ]
   ],
   "use": "contractionary fiscal policy, budget deficit vs surplus, debt and credibility, capital vs current spending, short run vs long run",
   "but": "Cutting public works by 74.4% in real terms boosts the budget now but can lower LRAS later, and inflation was still 33.4% in September 2026."
  }
 },
 {
  "id": "uk-mini-budget-gilt-crisis",
  "tk": "GILT",
  "title": "The UK mini-budget and the gilt crisis",
  "region": "United Kingdom",
  "years": "2022–2026",
  "subtopic": "3.6 (also 3.5)",
  "concepts": [
   "Expansionary fiscal policy",
   "Budget deficit",
   "Government (public) debt",
   "Credibility",
   "Crowding out",
   "Time lags"
  ],
  "hook": "In September 2022 the UK announced about £45bn of unfunded tax cuts, 30-year gilt yields jumped 160 basis points in four days, the Bank of England had to step in, and the prime minister resigned.",
  "facts": [
   "The 23 September 2022 'Growth Plan' cut taxes by about £45bn a year by 2026/27 with no independent OBR forecast and no plan to pay for them.",
   "30-year gilt yields rose about 160 basis points in four trading days. On 28 September the Bank of England began emergency purchases of long-dated gilts, and yields fell more than 100 basis points that day.",
   "Pension funds sold about £37bn of gilts during the crisis, and the Bank of England bought £19.3bn before the scheme ended on 14 October 2022.",
   "Liz Truss resigned on 20 October 2022 after 44 days in office, the shortest-serving UK prime minister.",
   "The credibility issue lasted: in May 2026 30-year gilt yields reached 5.78%, the highest since 1998, with public sector net debt at 94.3% of GDP."
  ],
  "diagram": "AD/AS: planned tax cuts would shift AD right, but show that higher interest rates (gilt yields and mortgage rates) push C and I down, so AD shifts back left. This is crowding out made worse by a loss of credibility.",
  "evaluation": [
   "Credibility: the markets judged the plan unsustainable, so borrowing costs rose and the tax cuts were mostly reversed within weeks.",
   "Fiscal vs monetary conflict: the Bank of England was raising rates to fight inflation above 10%, while the Treasury added demand.",
   "Losers: homeowners faced higher mortgage rates and pension funds were forced to sell assets. Long-term, the UK may pay a higher risk premium.",
   "Counter-view: supply-side tax cuts could raise LRAS in the long run, but only if markets trust the debt path in the meantime."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 3,
   "evaluation": 5
  },
  "verdict": "The classic case of fiscal credibility and crowding out, still referenced in 2025–26 gilt sell-offs. Weakness: the core event is from 2022 and the Unit 4 bank already uses the UK for Brexit.",
  "sources": [
   "https://www.aljazeera.com/news/2022/9/23/uk-mini-budget-shakes-the-stock-market-benefits-the-wealthy",
   "https://www.bankofengland.co.uk/-/media/boe/files/letter/2022/october/letter-from-jon-cunliffe-ldi-5-october-2022",
   "https://www.ifre.com/bonds/697790/ldi-funds-shrug-off-surging-uk-gilt-yields",
   "https://bankunderground.co.uk/2023/07/18/lifting-the-lid-on-a-liquidity-crisis/",
   "https://www.itv.com/thismorning/articles/liz-truss-resigns-as-prime-minister",
   "https://www.fxstreet.com/news/uk-30-year-gilts-hit-578-the-highest-since-1998-what-is-being-priced-in-202605051937",
   "https://bankunderground.co.uk/2024/12/05/stable-gilts-and-stable-prices-assessing-the-bank-of-englands-response-to-the-ldi-crisis/",
   "https://lbc.co.uk/business/55649f3f5f1c43a199fba3490a516c5e"
  ],
  "mem": {
   "tag": "£45bn, 44 days",
   "story": "£45bn of unfunded tax cuts → 30-year gilt yields up 160bp in four days → Bank of England emergency bond buying → tax cuts reversed, Truss resigns → UK still pays a credibility premium in 2026",
   "numbers": [
    [
     "£45bn",
     "unfunded tax cuts, September 2022"
    ],
    [
     "160 basis points",
     "rise in 30-year gilt yields in four days"
    ],
    [
     "5.78%",
     "30-year gilt yield, May 2026, highest since 1998"
    ]
   ],
   "use": "fiscal credibility, budget deficit and debt, crowding out, fiscal vs monetary policy conflict, limits of expansionary fiscal policy",
   "but": "Part of the yield spike came from pension funds' leveraged strategies (they sold about £37bn of gilts), not only from the fiscal plan itself."
  }
 },
 {
  "id": "kenya-finance-bill-protests",
  "tk": "RUTO",
  "title": "Kenya: the tax rise that was stopped in the street",
  "region": "Kenya",
  "years": "2024–2026",
  "subtopic": "3.6 (also 3.4)",
  "concepts": [
   "Contractionary fiscal policy",
   "Budget deficit",
   "Government (public) debt",
   "Indirect taxes",
   "Political constraints on fiscal policy"
  ],
  "hook": "Kenya's 2024 Finance Bill tried to raise KES 346.7bn in new taxes to service debt of about 70% of GDP. Protesters stormed parliament, the bill was withdrawn, and Moody's cut Kenya deeper into junk.",
  "facts": [
   "The Finance Bill 2024 aimed to raise KES 346.7bn (1.9% of GDP), including taxes on bread, cooking oil and mobile money, to cut a deficit tied to debt of about 70% of GDP.",
   "Parliament passed it on 25 June 2024; protesters stormed parliament and the human rights commission recorded 22 deaths. President Ruto withdrew the bill on 26 June.",
   "The gap was to be filled with KES 177bn of spending cuts and KES 169.7bn of extra borrowing, and Moody's downgraded Kenya from B3 to Caa1 in July 2024.",
   "In the 2026/27 budget (April 2026), interest payments of KES 1,254.2bn take about 26% of total spending of KES 4,817.8bn, leaving a deficit of KES 1,111.8bn."
  ],
  "diagram": "AD/AS: contractionary fiscal policy (higher indirect taxes) shifts AD left, lowering real GDP. Add a note that higher indirect taxes also raise costs, shifting SRAS left, so prices of basics rise for the poor.",
  "evaluation": [
   "Political limits: fiscal policy needs public consent, and regressive taxes on basics like bread hit low-income households hardest.",
   "Debt trap: when interest takes about a quarter of spending, there is less room for schools, health and capital spending that raise LRAS.",
   "No easy option: withdrawing the bill meant more borrowing and a ratings downgrade, which raises future borrowing costs.",
   "Spending cuts vs tax rises: Moody's doubted the government could deliver spending-led consolidation, so the deficit target of 3.3% was expected to be missed (4.6% forecast)."
  ],
  "rating": {
   "relevance": 4,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "Best for the political and equity limits of fiscal policy in a developing economy with high debt. Weakness: Kenya's deficit figures differ a lot between sources, so stick to the headline numbers.",
  "sources": [
   "https://www.aljazeera.com/news/2024/6/26/activists-call-for-new-protests-in-kenya-following-deadly-police-crackdown",
   "https://malaysia.news.yahoo.com/kenyas-ruto-withdraws-finance-bill-154132430.html",
   "https://cms.ic.africa/insights/moodys-downgrades-kenyas-rating-from-b3-to-caa1/",
   "https://www.the-star.co.ke/business/kenya/2024-07-09-moodys-demotes-kenya-after-finance-bill-rejection",
   "https://citizen.digital/article/kenya-tables-a-ksh48-trillion-budget-troubled-by-debt-burden-middle-east-shocks-n382631"
  ],
  "mem": {
   "tag": "Taxing bread backfires",
   "story": "Debt about 70% of GDP → KES 346.7bn tax bill → protesters storm parliament, bill withdrawn → more borrowing and a Moody's downgrade → interest takes about 26% of spending by 2026/27",
   "numbers": [
    [
     "KES 346.7bn",
     "planned new taxes, Finance Bill 2024"
    ],
    [
     "70%",
     "public debt, % of GDP (2024)"
    ],
    [
     "26%",
     "interest share of 2026/27 spending"
    ]
   ],
   "use": "contractionary fiscal policy, government debt, indirect taxes and equity, political constraints on fiscal policy, developing economies",
   "but": "Without the tax rises Kenya borrowed KES 169.7bn more and was downgraded, so avoiding austerity today raised the cost of debt tomorrow."
  }
 },
 {
  "id": "india-pli-manufacturing",
  "tk": "PLIX",
  "title": "India pays firms to make phones: the PLI scheme",
  "region": "India",
  "years": "2021–2026",
  "subtopic": "3.7",
  "concepts": [
   "Interventionist supply-side policies",
   "Industrial policies",
   "LRAS shifts right",
   "international competitiveness",
   "government failure",
   "opportunity cost",
   "time lags"
  ],
  "hook": "India set aside ₹1.97 lakh crore (about $23bn) to pay manufacturers per unit of extra output, and phones became its biggest export, yet under 8% of the money had been paid out by October 2024.",
  "facts": [
   "The Production Linked Incentive (PLI) scheme, announced in 2021, covers 14 sectors with a total outlay of ₹1.97 lakh crore; by 31 December 2025 it had paid out ₹28,748 crore and attracted investment of over ₹2.16 lakh crore, with 14.39 lakh jobs reported (commerce ministry, February 2026).",
   "Mobile phones are the star sector: production more than doubled to ₹5.5 lakh crore in FY2024–25 and exports reached about ₹2 lakh crore; in FY2025–26 smartphone exports were about ₹2.6 trillion ($29.4bn), with iPhones alone about ₹2 trillion.",
   "Reuters (March 2025) reported that only $1.73bn, under 8% of the allocated funds, had been paid by October 2024, output under the scheme was 37% of the government's target, and manufacturing's share of GDP had fallen from 15.4% to 14.3% since launch; the government decided not to extend it to new sectors.",
   "Critics such as former RBI governor Raghuram Rajan argued the subsidy rewards final assembly, not domestic value added, as imports of chips, displays and batteries rose.",
   "In July 2026 the cabinet approved a ₹62,500 crore mobile PLI 2.0 with extra incentives of up to 1.5% for domestic sourcing of components, plus 3% for R&D by Indian brands."
  ],
  "diagram": "AD/LRAS: LRAS shifts right from Yp1 to Yp2 as capital and skills in manufacturing rise; note the subsidy is also government spending, so AD shifts slightly right in the short run.",
  "evaluation": [
   "Sector success is uneven: phones boomed, but overall output was only 37% of target and manufacturing's GDP share fell, so the LRAS effect for the whole economy is unclear.",
   "Paying per unit of output limits fiscal risk (firms are only paid if they produce), which is why under 8% of funds were spent, but it also shows many firms missed targets.",
   "Assembly-heavy growth may add little domestic value added and few linkages, a classic government failure risk in picking sectors; PLI 2.0's component bonus is the policy response.",
   "Time lags and opportunity cost: the ₹1.97 lakh crore could have gone to education or infrastructure that raises productivity in every sector, not just 14."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Best industrial policy example from an emerging economy, with official outcome data and a sharp success vs failure split. Weakness: hard to separate PLI's effect from Apple's China-plus-one shift.",
  "sources": [
   "https://www.etvbharat.com/en/business/government-disburses-rs-28748-crore-under-14-pli-schemes-till-dec-last-year-enn26022003394",
   "https://www.businessday.co.za/bd/world/2025-03-24-india-to-lapse-23bn-domestic-manufacturing-plan-sources-say",
   "https://www.businesstoday.in/technology/story/india-iphone-exports-rs-2-trillion-fy26-top-branded-export-528219-2026-04-30",
   "https://www.freepressjournal.in/business/union-cabinet-approves-62500-crore-mobile-phone-pli-20-scheme-to-boost-manufacturing-and-exports",
   "https://www.businesstoday.in/amp/latest/in-focus/story/is-india-really-manufacturing-mobile-phones-former-rbi-governor-raghuram-rajan-on-pli-scheme-383469-2023-05-30"
  ],
  "mem": {
   "tag": "Paid per phone",
   "story": "₹1.97 lakh crore output subsidy → Apple suppliers expand in India → phone exports hit ₹2 lakh crore → other sectors miss targets → PLI 2.0 rewards local components",
   "numbers": [
    [
     "₹1.97 lakh crore",
     "PLI outlay, 14 sectors"
    ],
    [
     "under 8%",
     "share of funds paid by Oct 2024"
    ],
    [
     "₹2 lakh crore",
     "phone exports FY2024–25"
    ]
   ],
   "use": "industrial policy, interventionist supply-side policy, government failure, competitiveness and current account, evaluate supply-side policies",
   "but": "Manufacturing's share of GDP fell from 15.4% to 14.3% after launch, so the scheme has not yet delivered economy-wide LRAS growth."
  }
 },
 {
  "id": "argentina-chainsaw-deregulation",
  "tk": "MOTO",
  "title": "Argentina deregulates: rent decontrol, privatisation and a labour law",
  "region": "Argentina",
  "years": "2023–2026",
  "subtopic": "3.7",
  "concepts": [
   "Market-based supply-side policies",
   "Deregulation",
   "Privatisation",
   "Labour market reforms",
   "LRAS shifts right",
   "equity trade-offs"
  ],
  "hook": "When Milei scrapped rent controls in December 2023, Buenos Aires rental listings jumped by about 46% at once and real rents fell, the textbook deregulation result.",
  "facts": [
   "A December 2023 decree repealed the 2020 rental law; an IZA study (September 2025) estimates an immediate rise of about 46% in Buenos Aires rental listings and real rent falls of 13–29%, with listings more than doubling overall.",
   "The Ley Bases (Law 27,742, 2024) declared state firms including AySA, Belgrano Cargas, Enarsa and Intercargo subject to privatisation; a tender for 100% of airport-services firm Intercargo began in July 2025, and Decree 494/2025 authorised selling at least 51% of water company AySA to a strategic operator.",
   "On 27 February 2026 the Senate passed a labour modernisation law by 42 votes to 28: it allows the working day to be extended from 8 to 12 hours, requires minimum services in essential sectors during strikes and creates routes to register informal workers.",
   "GDP grew 4.4% in 2025 (INDEC) after a 2024 recession, and poverty fell to 28.2% in the second half of 2025 from 31.6% in the first half, though UCA researchers argue up to three-quarters of the fall since 2023 may be a statistical effect."
  ],
  "diagram": "AD/LRAS (new classical): deregulation, privatisation and labour reform shift LRAS right from Yp1 to Yp2, raising potential output and lowering the price level. A rental market S/D diagram (supply shifts right) shows the micro step.",
  "evaluation": [
   "Strong short-run evidence from rents, but the IZA authors say results are preliminary and partly reflect landlords releasing units they had held back, a one-off rather than new building.",
   "Equity trade-off: the labour law weakens job protection and strike rights, and unions call it a cut to workers' security; polling was split 48.6% for and 45.2% against.",
   "Privatisation only raises efficiency if competition or regulation follows; selling a water monopoly like AySA risks a private monopoly replacing a public one, which is why a new regulatory framework (Decree 493/2025) came first.",
   "Hard to separate supply-side effects from the demand-side shock therapy and the fall in inflation from 211% in 2023, so the 4.4% growth is not proof that LRAS shifted."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Best all-in-one market-based package, with a clean causal study on rents. Different angle from the Unit 4 peso band case, but avoid using it twice in one paper.",
  "sources": [
   "https://docs.iza.org/dp18107.pdf",
   "https://www.aljazeera.com/news/2026/2/28/argentina-senate-approves-contentious-milei-backed-labour-reforms",
   "https://allende.com/en/administrative/privatization-process-of-state-owned-companies-under-the-framework-of-law-no-27742-07-30-2025/",
   "https://batimes.com.ar/news/economy/milei-cheers-as-indec-says-argentinas-economy-grew-44-in-2025.phtml",
   "https://buenosairesherald.com/economics/poverty-drops-to-28-2-the-lowest-in-six-years"
  ],
  "mem": {
   "tag": "Rent law scrapped",
   "story": "rent law repealed → withheld flats return to market → listings up 46% and real rents fall → state firms put up for sale → 2026 labour law loosens hiring",
   "numbers": [
    [
     "46%",
     "jump in rental listings at repeal"
    ],
    [
     "12 hours",
     "max working day allowed (from 8)"
    ],
    [
     "4.4%",
     "GDP growth 2025"
    ]
   ],
   "use": "deregulation, privatisation, labour market reforms, market-based vs interventionist, equity trade-offs of supply-side policy",
   "but": "The labour law passed only 42 to 28 amid mass protests, and UCA warns up to three-quarters of the reported poverty fall may be a measurement effect."
  }
 },
 {
  "id": "eu-chips-act-intel-magdeburg",
  "tk": "CHIPS",
  "title": "EU Chips Act: a 20% target and a cancelled €10bn Intel fab",
  "region": "European Union (Germany, Poland)",
  "years": "2023–2026",
  "subtopic": "3.7",
  "concepts": [
   "Industrial policies",
   "Interventionist supply-side policies",
   "investment in new technology",
   "government failure",
   "opportunity cost",
   "time lags"
  ],
  "hook": "Germany promised Intel nearly €10bn for a chip plant in Magdeburg, then Intel walked away in July 2025, while EU auditors said the 20% market-share goal was very unlikely.",
  "facts": [
   "The 2023 Chips Act aims for a 20% share of global microchip production value by 2030, backed by an estimated €86bn of funding to 2030, of which the Commission controls only 5% (€4.5bn) (European Court of Auditors, April 2025).",
   "The Commission's own July 2024 forecast had the EU share rising only from 9.8% in 2022 to 11.7% by 2030; the auditors called the 20% target very unlikely and urged a reality check.",
   "Germany agreed nearly €10bn of state aid for Intel's Magdeburg fab in 2023; Intel paused it in 2024 and on 24 July 2025 dropped both Magdeburg and a $4.6bn plant near Wrocław in Poland that was meant to create 2,000 jobs.",
   "By contrast, the Commission approved €5bn of German aid for the TSMC-led ESMC fab in Dresden in August 2024, with production expected from 2027; a Chips Act 2.0 was proposed on 3 June 2026."
  ],
  "diagram": "AD/LRAS: successful chip investment shifts LRAS right (more capital and technology); show the risk that if the subsidised firm leaves, LRAS does not move but the opportunity cost of the funds remains.",
  "evaluation": [
   "Government failure: subsidies were concentrated on a few firms, so one cancellation (Intel) damages the whole target, as the auditors warned.",
   "ZEW argued the cancellation came just in time because the money had not been paid; it suggested funding shared research and education infrastructure that stays even if a firm leaves.",
   "Subsidy race: the EU competes with US and Asian subsidies, so aid may just move plants between countries rather than raise world output.",
   "Long time lags: fabs take years to build (Dresden output only from 2027), so benefits to potential output arrive long after the spending."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Best example of industrial policy failing on its own targets, with an official audit. Weakness: rich-country case, so pair it with India for a developing contrast.",
  "sources": [
   "https://www.eca.europa.eu/ECAHTMLNews/NEWS-SR-2025-12/en/body.html",
   "https://heise.de/-10364885",
   "https://polskieradio.pl/395/7786/Artykul/3556376,intel-pulls-plug-on-planned-investments-in-poland-and-germany",
   "https://www.zew.de/PM9498-1",
   "https://digital-strategy.ec.europa.eu/en/news/commission-approves-eu5-billion-german-state-aid-measure-support-esmc-setting-new-semiconductor",
   "https://aeneas-office.org/2026/06/03/european-commission-unveils-proposed-chips-act-2-0/"
  ],
  "mem": {
   "tag": "Fab that never was",
   "story": "Chips Act sets 20% goal → Germany offers Intel nearly €10bn → Intel pauses, then cancels in 2025 → auditors forecast 11.7% share → Chips Act 2.0",
   "numbers": [
    [
     "20%",
     "EU target share of chips by 2030"
    ],
    [
     "11.7%",
     "forecast EU share in 2030"
    ],
    [
     "€10bn",
     "German aid offered to Intel (nearly)"
    ]
   ],
   "use": "industrial policy, R&D and new technology, government failure, opportunity cost, limits of interventionist supply-side policies",
   "but": "The €5bn TSMC Dresden fab went ahead, so targeted subsidies can still add capacity when the firm is competitive."
  }
 },
 {
  "id": "singapore-skillsfuture",
  "tk": "SKFU",
  "title": "Singapore's SkillsFuture: training credits for every adult",
  "region": "Singapore",
  "years": "2024–2026",
  "subtopic": "3.7 (also 3.4)",
  "concepts": [
   "Interventionist supply-side policies",
   "investment in human capital",
   "education and training",
   "structural unemployment",
   "natural rate of unemployment",
   "LRAS shifts right"
  ],
  "hook": "Singapore gives every citizen aged 40+ a S$4,000 training credit, and 606,000 people trained in 2025, yet about 60% let an earlier S$500 top-up expire unused.",
  "facts": [
   "From 1 May 2024 every Singaporean aged 40 and over received a S$4,000 SkillsFuture Credit (Mid-Career); over 36,000 used it in the first year, claiming over S$24m (MOE, September 2025).",
   "606,000 individuals took part in SkillsFuture-supported training in 2025, up from 555,000 in 2024, boosted by the expiry of a one-off S$500 top-up on 31 December 2025.",
   "Only about 40% of eligible Singaporeans used that 2020 S$500 top-up before it expired, and the government does not track use by income or housing type (MOE, February 2026).",
   "About 55% of almost 4,300 previously unemployed trainees on Career Transition Programmes found jobs within six months (June 2022 to December 2024)."
  ],
  "diagram": "AD/LRAS: training raises labour quality, so LRAS shifts right from Yp1 to Yp2; link to a lower natural rate of unemployment as structural mismatch falls.",
  "evaluation": [
   "Low take-up: 60% of the S$500 top-up went unused, so a voucher does not by itself change behaviour; usage spiked only at the deadline.",
   "Equity is unknown: without income data, the subsidy may mostly help already-skilled workers who would have trained anyway (deadweight).",
   "Outcome evidence is thin: the 55% job rate covers only one programme, and the government reports no wage gains, so the LRAS effect is hard to measure.",
   "Long time lags: human capital pays off over decades, so it does not help in a sudden downturn, though from April 2025 Singapore added SkillsFuture Jobseeker Support of up to S$6,000 for the involuntarily unemployed."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Best clean example of education and training as supply-side policy, with official take-up data. Weakness: little hard evidence on productivity or wages.",
  "sources": [
   "https://www.moe.gov.sg/news/parliamentary-replies/20250925-career-impact-of-skillsfuture-credits-mid-career-training-allowance-and-level-up-programme",
   "https://www.ssg.gov.sg/newsroom/more-than-1-in-2-eligible-singaporeans-aged-30-75-utilised-skillsfuture-credit-as-the-skillsfuture-movement-marked-its-10th-anniversary/",
   "https://www.moe.gov.sg/news/parliamentary-replies/20260203-data-on-profile-of-persons-with-forfeited-skillsfuture-credits-and-total-value-involved",
   "https://www.moe.gov.sg/news/parliamentary-replies/20260212-skillsfuture-credit-utilisation-across-income-bands-housing-types-and-course-areas-in-2025-and-further-strategies",
   "https://www.mom.gov.sg/newsroom/parliament-questions-and-replies/2025/0923-written-answer-to-pq-on-skillsfuture-jobseeker-support-scheme"
  ],
  "mem": {
   "tag": "Credits for skills",
   "story": "fear of skills mismatch → S$4,000 credit for over-40s → 606,000 train in 2025 → 40% use the S$500 top-up → outcomes barely tracked",
   "numbers": [
    [
     "S$4,000",
     "mid-career training credit, age 40+"
    ],
    [
     "606,000",
     "people trained in 2025"
    ],
    [
     "40%",
     "used the S$500 top-up before expiry"
    ]
   ],
   "use": "education and training, human capital, structural unemployment, interventionist supply-side policy, time lags",
   "but": "Only about 40% used the S$500 top-up, so subsidised training may mostly reach people who would have trained anyway."
  }
 }
];
