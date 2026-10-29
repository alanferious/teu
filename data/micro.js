// Unit 2 real-world examples: the best recent, non-US cases for each micro subtopic, researched and
// checked against the linked sources on 29 October 2026. Same shape as data/macro.js (tk is the code
// shown at the duty free, cue a figure-free prompt for the drills). The ratings are ours, not examiner
// scores. Figures move: check the newest numbers before an exam.
const MICRO = [
 {
  "id": "norway-electric-cars",
  "tk": "NOEV",
  "title": "Norway: 98.8% of new cars sold are electric",
  "cue": "Norway: electric cars replace petrol cars",
  "region": "Norway",
  "years": "2024–2026",
  "subtopic": "2.1",
  "concepts": [
   "demand",
   "change in demand",
   "substitutes",
   "complements",
   "law of demand",
   "substitution effect"
  ],
  "hook": "Battery-electric cars took 95.9% of Norway's new car sales in 2025 (88.9% in 2024) and 98.8% in September 2026, when only 14 of 18,733 new cars registered ran on petrol alone.",
  "facts": [
   "OFV data (Reuters, January 2026): electric cars were 95.9% of the 179,549 new cars registered in 2025, a record total up 40% on 2024. The share was 88.9% in 2024. Most of the remaining non-electric sales were specialised vehicles such as police cars and wheelchair-accessible cars.",
   "Norway has long taxed petrol and diesel cars heavily while exempting electric cars from VAT. It began taxing electric cars in 2023 and, from 1 January 2026, added VAT (up to about $5,000 per car) on electric cars costing more than NOK 300,000, which caused a rush of registrations in December 2025 (Reuters).",
   "September 2026 (OFV via electrive, 1 October 2026): 18,511 of 18,733 new cars were electric (98.8%), with 77 diesel (0.4%) and 14 petrol (0.1%). The electric share for January to September 2026 was 97.8%.",
   "The existing fleet changes much more slowly: on 30 September 2026 electric cars were 35.3% of all Norwegian passenger cars, against 29.4% diesel and 22.9% petrol (OFV via electrive)."
  ],
  "diagram": "Market for new petrol cars: demand shifts left because the substitute (electric cars) became relatively cheaper through tax breaks and more popular, so equilibrium price and quantity fall. Draw the electric car market alongside with demand shifting right. A third, optional diagram for petrol fuel (a complement to petrol cars) shows demand shifting left only gradually as the old fleet is scrapped.",
  "evaluation": [
   "Relative prices vs tastes: the switch is driven mostly by tax policy that changed the relative price of the two substitutes. The head of the Norwegian EV association said petrol cars are being 'taxed out of business', so this is as much about government intervention as about changing tastes.",
   "Short run vs long run: new car demand has switched almost completely, but electric cars are only 35.3% of the fleet. Demand for complements such as petrol and petrol stations falls slowly, over the years it takes to replace old cars.",
   "Timing and magnitude: the December 2025 rush before the new VAT shows that buyers respond strongly to price changes, but some of those sales were simply brought forward, so single months can exaggerate the trend.",
   "Generalisability: Norway is a high-income country that can afford large tax exemptions, so the same result may not happen in lower-income countries where electric cars remain more expensive to buy."
  ],
  "rating": {
   "relevance": 4,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "The most extreme real case of demand moving to a substitute, with monthly official registration data. Weakness: the shift is policy-driven, so it overlaps with 2.7 (taxes and subsidies) rather than being a pure change in tastes.",
  "sources": [
   "https://www.electrive.com/2026/10/01/norway-tesla-model-y-made-up-a-quarter-of-new-passenger-car-sales-in-september/",
   "https://www.gmanetwork.com/news/money/motoring/971455/norway-s-new-car-sales-were-96-electric-in-2025/story/"
  ],
  "mem": {
   "tag": "Norway goes electric",
   "story": "Heavy taxes on petrol cars and VAT breaks for electric cars → electric cars become relatively cheaper → 88.9% of new sales in 2024 → 95.9% in 2025 → 98.8% in September 2026 → but only 35.3% of the fleet",
   "numbers": [
    [
     "95.9%",
     "electric share of new car sales, 2025"
    ],
    [
     "98.8%",
     "electric share of new car sales, September 2026"
    ],
    [
     "35.3%",
     "electric share of Norway's whole car fleet, 30 September 2026"
    ]
   ],
   "use": "change in demand, substitutes and complements, determinants of demand, relative prices, link to indirect taxes and subsidies (2.7)",
   "but": "The switch came mainly from tax policy changing relative prices, not from consumer tastes alone."
  }
 },
 {
  "id": "japan-matcha-boom",
  "tk": "MTCH",
  "title": "Matcha: a social media boom drives tencha to ¥13,972 a kilo",
  "cue": "Japan: the global matcha craze",
  "region": "Japan",
  "years": "2024–2026",
  "subtopic": "2.1 (also 2.2)",
  "concepts": [
   "demand",
   "change in demand",
   "competitive supply",
   "change in supply",
   "excess demand (shortage)",
   "incentive function"
  ],
  "hook": "A global matcha craze spread by social media pushed the average price at Kyoto's first tencha (matcha leaf) auction from a record ¥8,235 a kilo in May 2025 (up 170%) to ¥13,972 in May 2026, while Japan's green tea exports rose 42% to 13,125 tonnes in FY2025.",
  "facts": [
   "Reuters (4 July 2025): the first Kyoto tencha auction of 2025 averaged ¥8,235/kg, up 170% on a year earlier and above the 2016 record of ¥4,862. Viral social media attention from autumn 2024 drove demand; one online retailer said its matcha demand grew ten-fold in 2024 and it sometimes imposed purchase limits. Heat also cut yields.",
   "Global Japanese Tea Association (May 2026): the first 2026 Uji tencha auction on 13 May averaged ¥13,972/kg for machine-picked tencha, about 1.7 times the 2025 record. In Kagoshima, the largest tencha-producing prefecture, the average on 14 May was about ¥19,000/kg, roughly 1.8 times 2025.",
   "Jiji Press (1 May 2026, Finance Ministry data): green tea exports in FY2025 (to March 2026) rose 42% to 13,125 tonnes and 2.2-fold in value to ¥84.7 billion. Powdered tea including matcha was about 70% of the volume. Green tea imports rose 82% to 5,801 tonnes.",
   "Supply responds slowly: tencha output was 5,336 tonnes in 2024, nearly 2.7 times its level ten years earlier (Reuters), but new tea fields take about five years to harvest. Farmers are switching from sencha to tencha (one Shizuoka cooperative went from under 10% to about 70% of its 17 hectares), adding to a sencha shortage; Ito En and Coca-Cola Bottlers Japan raised bottled green tea prices by about 10% in March 2026 (Japan News, June 2026)."
  ],
  "diagram": "Market for tencha: demand shifts right (tastes, social media, health trend) against a steep short-run supply curve, so price rises sharply with only a small rise in quantity. Add a second diagram for sencha: because the same tea fields can grow either product (competitive supply), farmers switching to tencha shift sencha supply left, so sencha prices rise too.",
  "evaluation": [
   "Tastes can change back: a demand shift based on social media trends may fade, while farmers who invest in shading and processing machines (one cooperative spent about $1.4 million) are betting on long-run demand. The five-year wait before new fields produce makes this risky.",
   "Short run vs long run: in the short run supply is nearly fixed, so price rises; in the long run higher prices attract more tencha planting and more imports, which should ease prices. The 2026 auction shows that point had not been reached by mid-2026.",
   "Stakeholders: tencha growers gain, but buyers of sencha and bottled tea in Japan pay more because of competitive supply, and cafés abroad face higher costs. A record 13 Japanese tea producers still closed in 2025 (Teikoku Databank), so the boom has not helped every farm.",
   "Mixed causes: heat reduced yields in 2025 at the same time as demand rose, so the price rise combines a demand shift and a supply shift. A strong answer shows both and argues which was larger."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A vivid change-in-tastes example with auction and export data, plus a neat competitive-supply twist. Weakness: auction averages cover only the first sale of the season, and over 30% of exports go to the United States.",
  "sources": [
   "https://www.arabnews.jp/en/business/article_150794",
   "https://gjtea.org/japanese-tea-report-may-2026/",
   "https://english.adnkronos.com/2026/05/01/japan-green-tea-exports-jump-in-fy-2025-amid-global-matcha-boom/",
   "https://www.koreaherald.com/article/10762953"
  ],
  "mem": {
   "tag": "Matcha mania",
   "story": "Matcha goes viral on social media → demand for tencha surges → Kyoto auction hits ¥8,235 in 2025 → ¥13,972 in 2026 → farmers switch fields from sencha to tencha → sencha and bottled tea prices rise",
   "numbers": [
    [
     "¥13,972",
     "average price per kg, first Uji tencha auction, May 2026"
    ],
    [
     "42%",
     "rise in Japan's green tea export volume, FY2025"
    ],
    [
     "five years",
     "time before newly planted tea fields can be harvested"
    ]
   ],
   "use": "change in demand from tastes, competitive supply, short run vs long run supply, agricultural markets, link to price elasticity of supply (2.6)",
   "but": "Demand built on a social media trend could fade before new tea fields, which take five years to produce, come on stream."
  }
 },
 {
  "id": "cocoa-supply-shock",
  "tk": "COCO",
  "title": "Cocoa: a 492,000-tonne deficit sends prices to a record $12,906",
  "cue": "Cocoa: West African harvest failure and price swings",
  "region": "Côte d'Ivoire and Ghana (global market)",
  "years": "2023–2026",
  "subtopic": "2.2 (also 2.3)",
  "concepts": [
   "change in supply",
   "law of supply",
   "law of demand",
   "change in quantity demanded",
   "market equilibrium",
   "signalling function",
   "excess supply (surplus)"
  ],
  "hook": "After a 492,000-tonne global deficit in 2023/24, cocoa futures hit a record $12,906 a tonne in December 2024; as output recovered 8.5% and grindings fell, prices dropped below $3,000 in February 2026 and stood at $5,456 on 28 October 2026.",
  "facts": [
   "ICCO (February 2026 bulletin): world production fell to 4.362 million tonnes in 2023/24 against grindings (a measure of demand) of 4.810 million tonnes, a deficit of 492,000 tonnes, and the stocks-to-grindings ratio fell to 26.4%. ING (February 2024) blamed heavy rain and black pod disease, then dry Harmattan winds; Côte d'Ivoire port arrivals were 33% down on the year, and West Africa supplies 73% of world cocoa.",
   "Cocoa futures reached an all-time high of $12,906 a tonne in December 2024 (Trading Economics). Some sources quote an intraday high of $12,931, so the exact figure depends on the contract used.",
   "ICCO (latest bulletin, reported 1 September 2026): 2024/25 production rose 8.5% to 4.733 million tonnes while grindings fell 3.3% to 4.649 million tonnes, giving a small surplus of 37,000 tonnes; end-of-season stocks rose to 1.309 million tonnes.",
   "Trading Economics: futures fell below $3,000 a tonne on 24 February 2026, the lowest since May 2023, on weak demand and a strong expected harvest; beans went unsold in Côte d'Ivoire and Ghana because buyers would not pay official farm-gate prices above world prices. On 28 October 2026 the price was $5,456, 9.7% lower than a year earlier.",
   "Demand revived at lower prices: Q3 2026 grindings rose 14.3% on a year earlier (Asia +29.2%, Europe +3.2%, North America −2.5%), and Côte d'Ivoire shipped 2.18 million tonnes between 1 October 2025 and 27 September 2026, up 19.8% (Trading Economics, October 2026)."
  ],
  "diagram": "Supply and demand for cocoa beans. Shift supply sharply left (bad weather and disease in 2023/24): with steep short-run supply and demand curves, price rises far more than quantity falls. Then shift supply right (2024/25 recovery) and show a movement up along the demand curve at the peak: grindings (quantity demanded) fell, so a surplus appeared and price fell back.",
  "evaluation": [
   "Short run vs long run: cocoa trees take years to mature, so supply could not respond quickly to the record price. The 2024/25 recovery came mainly from better weather, which shows the limits of the incentive function in the short run.",
   "Price as rationing: grindings fell 4.2% in 2024/25 (February 2026 ICCO bulletin) as chocolate makers bought less, then rose 14.3% in Q3 2026 once prices had more than halved. This is the law of demand at work, but with a time lag.",
   "Stakeholders: farm-gate prices in Côte d'Ivoire and Ghana are set by the state for each season, so the world price signal reaches growers late. In February 2026 beans went unsold because official farm-gate prices were above world prices, a reminder that this is not a free market at farm level.",
   "Magnitude and speculation: the 2024/25 surplus was only 37,000 tonnes, under 1% of grindings, yet prices fell by more than three-quarters from the peak to February 2026. Futures prices reflect expectations (weather, El Niño risk) and can overshoot changes in actual supply."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A textbook supply shock with an official ICCO balance sheet and a full rise-and-fall price cycle. Weakness: futures prices swing daily and the ICCO revises its estimates often, so every figure needs a date.",
  "sources": [
   "https://www.icco.org/february-2026-quarterly-bulletin-of-cocoa-statistics/",
   "https://www.foodbusinessmea.com/icco-cuts-global-cocoa-surplus-forecast-to-37000-t/",
   "https://tradingeconomics.com/commodity/cocoa",
   "https://tradingeconomics.com/commodity/cocoa/news/528123",
   "https://think.ing.com/articles/cocoa-deficit-concerns-grow-chocolate-prices-record"
  ],
  "mem": {
   "tag": "Chocolate price storm",
   "story": "Rain, disease then drought in West Africa → 492,000-tonne deficit → record $12,906 a tonne → grinders cut buying as crops recover → surplus, price below $3,000 → cheaper beans revive grindings",
   "numbers": [
    [
     "492,000 tonnes",
     "global cocoa deficit, 2023/24 (ICCO)"
    ],
    [
     "$12,906",
     "record cocoa futures price per tonne, December 2024"
    ],
    [
     "14.3%",
     "rise in Q3 2026 grindings as lower prices revived demand"
    ]
   ],
   "use": "supply shocks, determinants of supply, law of demand, price mechanism, commodity price volatility, short run vs long run",
   "but": "West African governments fix farm-gate prices, so the price signal reached cocoa growers late and weakly."
  }
 },
 {
  "id": "spain-olive-oil-drought",
  "tk": "OLIV",
  "title": "Spain: drought triples olive oil prices, a 1.3m-tonne crop halves them",
  "cue": "Spain: drought and the olive oil price spike",
  "region": "Spain",
  "years": "2022–2026",
  "subtopic": "2.2 (also 2.3)",
  "concepts": [
   "supply",
   "change in supply",
   "law of demand",
   "change in quantity demanded",
   "market equilibrium",
   "rationing function"
  ],
  "hook": "Drought cut Spain's olive oil crop below 700,000 tonnes in 2022/23, and its olive oil consumer price index rose from 87.5 in January 2021 to 266.7 in April 2024 (2015=100); after harvests of 1.42 and 1.3 million tonnes the index was 134.3 in September 2026, half its peak.",
  "facts": [
   "Spain's 2022/23 crop was under 700,000 tonnes, the smallest in two decades, and the Agriculture Ministry projected only 765,300 tonnes for 2023/24, 34% below the four-year average (ESM Magazine, January 2024). Spain produces about 45% of the world's olive oil.",
   "Eurostat: Spanish consumer prices for olive oil were 73.5% higher in October 2023 than a year earlier, and the EU-wide rate peaked at 52.4% in March 2024. Spain's olive oil price index (2015=100) rose from 87.5 in January 2021 to a peak of 266.7 in April 2024.",
   "Buyers responded: Spanish olive oil consumption fell 20% between November 2022 and November 2023, and the government cut VAT on olive oil to 5% (ESM Magazine).",
   "Supply recovered to 1.42 million tonnes in 2024/25 and 1.3 million in 2025/26 (Olive Oil Times). Spanish olive oil prices were 45.7% lower in June 2025 than a year earlier, and the index stood at 134.29 in September 2026 (Eurostat). Origin prices for extra virgin oil were about €362 per 100 kg by June 2026, the lowest since 2022 (Olive Oil Times).",
   "On 1 October 2026 the Agriculture Ministry's first estimate put the 2026/27 harvest at 1,602,596 tonnes, 23% more than the previous season, after a mild, wet spring. The ministry warned that summer heat could still reduce oil yields."
  ],
  "diagram": "Supply and demand for olive oil. Shift supply left for 2022/23 and 2023/24 (drought): price rises sharply and quantity falls along a fairly steep demand curve, with the 20% fall in consumption showing the rationing function. Then shift supply right for 2024/25 and 2025/26, moving to a lower price and higher quantity.",
  "evaluation": [
   "Weather, not prices, drove supply: olive trees take years to grow, so record prices did little to raise output in the short run. The recovery came from rain, which limits how far the incentive function explains the case.",
   "Demand was more responsive than expected for a kitchen staple: a 20% fall in Spanish consumption suggests buyers switched to other cooking oils, as the rationing function predicts, though the source does not measure switching directly.",
   "Prices fall more slowly in shops: origin prices dropped quickly, but in September 2026 the consumer index was still about 53% above January 2021, possibly because other costs such as energy, wages and packaging also rose.",
   "Stakeholders: consumers lost consumer surplus in 2023–24 while producers with oil to sell gained; with prices halved and a 1.6 million tonne crop forecast, the risk for producers has turned to low prices."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A clean supply-side example with official Eurostat price data in both directions, ideal for showing a supply shift and its reversal. Weakness: the 2026/27 harvest figure is a preliminary forecast and could be revised down.",
  "sources": [
   "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_midx?geo=ES&coicop=CP01153&unit=I15&sinceTimePeriod=2021-01",
   "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_minr?geo=ES&coicop18=CP011513&unit=I15&sinceTimePeriod=2025-09",
   "https://www.esmmagazine.com/supply-chain/spanish-olive-oil-prices-soar-165-in-three-years-257342",
   "https://www.oliveoiltimes.com/business/europe/spain-produces-1-3m-tons-of-olive-oil-as-prices-fall/144751",
   "https://www.mapa.gob.es/dam/mapa/contenido/prensa/notas-de-prensa/documentos/documentos-2026/26-10-01-l-planas-aforo-olivar.pdf"
  ],
  "mem": {
   "tag": "Liquid gold dries up",
   "story": "Drought cuts Spain's crop below 700,000 tonnes → shop prices triple → Spaniards buy 20% less → rain returns, crops of 1.42m and 1.3m tonnes → prices halve → 1.6m tonnes forecast for 2026/27",
   "numbers": [
    [
     "266.7",
     "Spain's olive oil price index at its April 2024 peak (2015=100)"
    ],
    [
     "20%",
     "fall in Spanish olive oil consumption, November 2022 to November 2023"
    ],
    [
     "1,602,596 tonnes",
     "first estimate of Spain's 2026/27 harvest"
    ]
   ],
   "use": "supply shocks, change in supply vs movement along demand, price mechanism and rationing, agricultural price volatility, short run vs long run",
   "but": "Supply recovered because the rain came back, not because high prices encouraged more planting."
  }
 },
 {
  "id": "france-wine-surplus",
  "tk": "VINO",
  "title": "Wine glut: world drinking down 14% since 2018, France uproots 27,000 hectares",
  "cue": "France: too much wine and too few drinkers",
  "region": "France (global market)",
  "years": "2018–2026",
  "subtopic": "2.3 (also 2.1)",
  "concepts": [
   "excess supply (surplus)",
   "change in demand",
   "market equilibrium",
   "price mechanism",
   "signalling function",
   "incentive function"
  ],
  "hook": "World wine consumption fell to 208 million hectolitres in 2025, 14% below 2018. France paid growers €4,000 a hectare to uproot about 27,000 hectares in 2026, and after a small 34.9 million hectolitre harvest, bulk red Vin de France prices rose 13% to about €60/hl.",
  "facts": [
   "OIV (12 May 2026): world wine consumption was 208 million hl in 2025, down 2.7% on 2024 and 14% since 2018, reflecting changing lifestyles and generational change in mature markets plus pressure on purchasing power. French consumption was 22.0 million hl, down 3.2% and 7.2% below its five-year average.",
   "OIV: France's vineyard area fell 4.4% in 2025 (about 34,000 hectares) to 740,000 hectares. World production of 227 million hl still exceeded consumption by about 18.7 million hl, although about 30 million hl a year goes to industrial uses such as distillation.",
   "French crisis measures: in 2023 a €200 million crisis distillation removed over 4 million hl at €45–75/hl. In 2026 growers applied to uproot 27,929 hectares at €4,000/ha and an EU-funded distillation offered €33/hl, up to €40 million (Pleinchamp, April 2026). About 27,000 hectares were uprooted in 2026, mainly in Bordeaux, the South-West and Occitanie (Pleinchamp, October 2026).",
   "Agreste (October 2026): the 2026 French harvest is estimated at about 34.9 million hl, 2% below 2025 and 14% below the 2021–2025 average, because of heatwaves, drought and uprooting.",
   "FranceAgriMer (1 October 2026, via Vinetur): in the first six weeks of 2026/27, bulk Vin de France red volumes traded fell 44% while the average price rose 13% to about €60/hl; IGP red rose 9% to about €95/hl (compared with 2024/25)."
  ],
  "diagram": "Wine market: demand shifts left (changing tastes, less drinking among younger people), creating excess supply at the old price, so stocks build up and price falls. Then shift supply left (uprooting, distillation of surplus stock, small 2026 harvest) so the market moves towards a new equilibrium at a lower quantity, with prices recovering from a low level.",
  "evaluation": [
   "The price signal works, but slowly: low prices told growers to cut capacity, but vines are long-lived assets and growers are reluctant to leave, so the state paid to speed up the exit. Without aid the surplus would last longer, but taxpayers would save money.",
   "Distillation vs uprooting: paying to turn surplus wine into industrial alcohol supports incomes now but weakens the signal to cut output, so it may delay adjustment. Uprooting is a more permanent fix that reduces supply for good.",
   "Structural or cyclical? The OIV points to generational change and lower alcohol consumption among younger people, so the demand fall looks long-run. A smaller vineyard is then the likely new equilibrium rather than a temporary fix.",
   "Stakeholders: the sector says it supports nearly 500,000 jobs and one in two independent winegrowers reports serious cash-flow problems (Pleinchamp, October 2026). The 2026 price recovery comes from heat and drought shrinking supply, not from a recovery in demand."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A rare clear example of persistent excess supply caused by a demand shift, with official OIV data and government responses to evaluate. Weakness: the 2026 price rise comes partly from bad weather, so market adjustment and luck are hard to separate.",
  "sources": [
   "https://www.oiv.int/sites/default/files/2026-05/OIV_EN_Press_release_State-of_the_World-Wine_Sector.pdf",
   "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf",
   "https://www.pleinchamp.com/actualite/viticulture-des-vignes-arrachees-face-a-une-crise-qui-s-enracine",
   "https://www.pleinchamp.com/actualite/distillation-de-crise-33-hl-a-concurrence-de-40-millions-d-euros",
   "https://www.vinetur.com/en/20261005108316/frances-bulk-red-wine-sales-fell-44-at-the-start-of-the-2026/27-season.html"
  ],
  "mem": {
   "tag": "Too much wine",
   "story": "Fewer people, especially the young, drink wine → world consumption down 14% since 2018 → unsold stocks and low prices → France pays €4,000 a hectare to uproot vines and distils surplus wine → small 2026 harvest → bulk red prices up 13%",
   "numbers": [
    [
     "208 million hl",
     "world wine consumption, 2025"
    ],
    [
     "27,929 hectares",
     "French vines put forward for paid uprooting, 2026"
    ],
    [
     "€60/hl",
     "average bulk Vin de France red price, start of 2026/27 (up 13%)"
    ]
   ],
   "use": "excess supply, price mechanism, change in demand from tastes, government intervention in agriculture, market adjustment over time",
   "but": "The 2026 price rise came mainly from heat and drought shrinking the harvest, not from the market correcting itself."
  }
 },
 {
  "id": "japan-rice-shortage",
  "tk": "RICE",
  "title": "Japan: rice hits ¥4,416 a bag, then falls below ¥3,000",
  "cue": "Japan: the rice shortage and stockpile release",
  "region": "Japan",
  "years": "2024–2026",
  "subtopic": "2.3 (also 2.2)",
  "concepts": [
   "market equilibrium",
   "excess demand (shortage)",
   "excess supply (surplus)",
   "rationing function",
   "signalling function",
   "incentive function",
   "consumer surplus"
  ],
  "hook": "A 5kg bag of supermarket rice in Japan rose from about ¥2,000 before the 2024 shortage to a record ¥4,416 in January 2026, despite the government selling stockpiled rice, then fell to ¥2,971 in September 2026 as a bigger harvest and record private stocks reached shops.",
  "facts": [
   "Causes (Nippon.com summary of a government white paper): extreme heat in 2023 cut milling yields, demand was higher than the farm ministry forecast (more foreign tourists and household buying), and an August 2024 Nankai Trough earthquake warning led households to stockpile rice. In May 2025 a 5kg bag cost ¥4,260, about double the ¥2,127 of a year earlier.",
   "On 26 May 2025 Prime Minister Ishiba announced that 300,000 tonnes of government stockpiled rice would be sold through discretionary contracts, an approach he called unprecedented, aiming for a shop price of about ¥2,000 per 5kg (Agriculture Minister Koizumi aimed for about ¥2,160 including tax).",
   "The effect faded: farm ministry data showed a record ¥4,316 per 5kg in the week from 3 November 2025, and wholesalers paid a record ¥37,058 per 60kg for 2025-crop rice in October 2025, 56% more than a year earlier, with cooperatives paying farmers advances 30–70% higher (Jiji Press).",
   "Prices peaked at ¥4,416 in early January 2026, then fell to ¥2,971 in the week of 7–13 September 2026 (about 1,000 supermarkets), the first reading below ¥3,000 since early September 2024. Private-sector rice stocks reached 1.6 million tonnes at the end of July 2026, up 700,000 tonnes on a year earlier and the highest July level since records began in 2008 (Nippon.com)."
  ],
  "diagram": "Supply and demand for rice starting at equilibrium near ¥2,000. Shift supply left (poor 2023 crop) and demand right (tourists, panic buying): at the old price there is excess demand, so price rises above ¥4,000. Then show 2025–26: supply shifts right (bigger 2025 harvest, stockpile release), so at the high price there is excess supply, stocks pile up and price falls towards ¥3,000.",
  "evaluation": [
   "The price mechanism worked, but slowly: high prices rationed rice and gave farmers an incentive to grow more, but rice has one harvest a year, so supply could only respond with the 2025 crop. In the short run supply was close to fixed.",
   "Government action had a limited effect: stockpiled rice at about ¥2,000 helped the shoppers who queued for it, but prices hit new records in late 2025 once cheap stock ran out, because expectations and high farm-gate payments set the market price.",
   "Stakeholders: consumers lost consumer surplus and farmers gained from 30–70% higher advance payments. Importers gained too, as private imports jumped from 1,015 tonnes in 2024 to 96,834 tonnes in 2025 despite a ¥341/kg tariff. With record stocks, the risk now turns to prices falling below farmers' costs.",
   "Assumption check: Japan's rice market is protected by a ¥341/kg tariff on private imports outside a tariff-free quota of about 770,000 tonnes, so foreign supply could not quickly fill the gap. The shortage reflects trade policy as well as weather and demand."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best full cycle of shortage, price rise, government release of stock and then surplus, all with official weekly price data. Weakness: many causes happened at once (weather, tourists, panic buying, distribution), so it is hard to say which shift mattered most.",
  "sources": [
   "https://www.nippon.com/en/japan-data/h02907/",
   "https://www.nippon.com/en/japan-data/h02811/",
   "https://japan.kantei.go.jp/103/statement/202505/26kaiken.html",
   "https://english.adnkronos.com/2025/11/18/japan-wholesalers-pay-record-high-price-for-rice-in-oct"
  ],
  "mem": {
   "tag": "Japan's rice rollercoaster",
   "story": "Hot 2023 crop, tourists and panic buying → shortage, 5kg bag doubles → 300,000 tonnes of stockpile sold at about ¥2,000 → prices still hit ¥4,416 → big 2025 harvest and record stocks → price below ¥3,000",
   "numbers": [
    [
     "¥4,416",
     "peak price of a 5kg bag of rice, January 2026"
    ],
    [
     "300,000 tonnes",
     "stockpiled rice released by discretionary contract, May 2025"
    ],
    [
     "¥2,971",
     "average 5kg price, 7–13 September 2026"
    ]
   ],
   "use": "price mechanism and its functions, shortages and surpluses, rationing, government intervention in agricultural markets, short run vs long run supply",
   "but": "Selling stockpiled rice at ¥2,000 did not stop prices hitting new records; the shortage ended only when the bigger harvest arrived."
  }
 },
 {
  "id": "uk-pension-auto-enrolment",
  "tk": "UKAE",
  "title": "UK pensions: a default lifts saving from 55% to 90%",
  "cue": "UK: automatic enrolment into workplace pensions",
  "region": "United Kingdom",
  "years": "2012–2026",
  "subtopic": "2.4",
  "concepts": [
   "behavioural economics",
   "nudge",
   "choice architecture",
   "bounded self-control",
   "bounded rationality",
   "anchoring"
  ],
  "hook": "After the UK made workplace pension saving the default from 2012, the share of eligible employees saving rose from 55% to 90% by 2025, while only 4% of the wholly self-employed, who have no default, save for retirement.",
  "facts": [
   "Automatic enrolment began in October 2012 with the largest employers and covered all employers by 2018. Workers are enrolled by default but keep the right to opt out. Since April 2019 the minimum contribution has been 8% of qualifying earnings, at least 3% from the employer (DWP, October 2022).",
   "DWP evaluation (2019): participation among eligible employees fell from 59% in 2008 to a low of 55% (10.7 million) in 2012, then rose to 87% (18.7 million) in 2018. Private-sector participation rose by 43 percentage points.",
   "DWP statistics (30 July 2026): about 90% of eligible employees (22.6 million) saved into a workplace pension in 2025, putting in £166.1 billion a year, £63.5 billion more in real terms than in 2012. Opt-outs among newly enrolled savers have risen to about 11–12% in the last year; an earlier DWP measure put them at 7.6% in January 2020.",
   "Gaps remain where the default is weak or missing: only about 55% of eligible employees at micro employers (under five staff) save (DWP, July 2026). The Pensions Commission's interim report (May 2026) found only 4% of wholly self-employed workers saving and about 15 million people undersaving, which could rise to 19 million."
  ],
  "diagram": "No standard market diagram is needed. If you want one, treat retirement saving as a merit good: MPB lies below MSB, so people under-save. The default nudge shifts MPB to the right towards MSB without a subsidy. Label the gap that remains, since many savers stay at the 8% minimum.",
  "evaluation": [
   "Why it works: rational choice theory says a default should not matter, because people can opt in or out at no cost. Inertia and bounded self-control (putting off a dull decision) explain why switching the default moved participation by about 35 percentage points.",
   "Participation is not adequacy: many savers stay at the 8% default, which acts like an anchor, and the Pensions Commission estimates about 15 million people are undersaving. A nudge changes who saves more easily than how much they save.",
   "Who misses out: the self-employed (4% saving), low earners below the earnings trigger and staff at micro employers are outside or on the edge of the default, so the nudge can widen gaps between groups.",
   "Alternatives and limits: opt-outs rose to about 11–12% during the cost-of-living squeeze, showing a default is weaker when money is tight, and opting out can be rational for a household in debt. A compulsory system or higher minimum rates would raise saving more, but remove choice."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "The clearest large-scale nudge in Europe, with official statistics showing a default changing the behaviour of millions. Weakness: the big jump happened in 2012–2018, so the newest figures are more about adequacy than about the nudge itself.",
  "sources": [
   "https://www.gov.uk/government/statistics/workplace-pension-participation-and-savings-trends-2009-to-2025/workplace-pension-participation-and-savings-trends-of-employees-2009-to-2025",
   "https://www.gov.uk/government/publications/automatic-enrolment-evaluation-report-2019/automatic-enrolment-evaluation-report-2019",
   "https://www.gov.uk/government/statistics/ten-years-of-automatic-enrolment-in-workplace-pensions/ten-years-of-automatic-enrolment-in-workplace-pensions-statistics-and-analysis",
   "https://workplacejournal.co.uk/2026/05/15-million-people-in-the-uk-are-undersaving-for-retirement-warns-pensions-commission/"
  ],
  "mem": {
   "tag": "Default to save",
   "story": "Pension saving is opt-in and falls to 55% → 2012: employers must enrol staff by default → inertia keeps most people in → 90% of eligible employees save by 2025 → the self-employed, with no default, stay at 4%",
   "numbers": [
    [
     "55%",
     "eligible employees saving in 2012, before the default"
    ],
    [
     "90%",
     "eligible employees saving in 2025"
    ],
    [
     "4%",
     "wholly self-employed workers saving, with no auto-enrolment"
    ]
   ],
   "use": "nudges and choice architecture, bounded self-control, behavioural vs rational consumer choice, merit goods and under-saving, alternatives to regulation",
   "but": "Participation is not adequacy: the Pensions Commission says about 15 million people still undersave, many stuck at the 8% default."
  }
 },
 {
  "id": "england-organ-donation-opt-out",
  "tk": "ENGOD",
  "title": "UK organ donation: opt-out law, yet consent falls from 68% to 57%",
  "cue": "England: Max and Keira's Law and opt-out organ donation",
  "region": "United Kingdom (England)",
  "years": "2020–2026",
  "subtopic": "2.4",
  "concepts": [
   "nudge",
   "choice architecture",
   "bounded selfishness",
   "bounded rationality",
   "framing",
   "behavioural economics"
  ],
  "hook": "England switched to opt-out (deemed consent) organ donation in May 2020, but the UK family consent rate fell from 68% in 2019/20 to 57% in 2025/26, and families refused in 602 of 1,092 deemed consent cases.",
  "facts": [
   "Max and Keira's Law took effect in England on 20 May 2020: adults are treated as willing donors unless they opt out. Wales (2015), Scotland (2021) and Northern Ireland (2023) have similar laws (NHSBT).",
   "NHSBT (21 July 2020): in 2019/20, just before the law, the UK consent/authorisation rate rose from 67% to 68%, with 1,580 deceased donors.",
   "NHSBT Activity Report 2025/26: the consent rate fell from 59% to 57% (England 56%). Deceased donors rose 2% to 1,428, still below 2019/20; 8,296 patients were waiting for a transplant at the end of March 2026 and 434 died on the active list during the year.",
   "Same report: consent was 87% where the patient had opted in but 44.9% where consent was only deemed; in 602 of 1,092 deemed cases the family did not support donation. Consent was 61% when a specialist nurse led the conversation and 8% without one, and 62% for white patients against 29% for ethnic minority patients.",
   "The NHS Organ Donor Register held 28.7 million opt-in registrations (41% of the population) and about 2.9 million opt-outs (NHSBT, March 2026)."
  ],
  "diagram": "No standard market diagram is needed. Sketch the choice architecture instead: default (opt-in vs opt-out), then the family conversation at the bedside, then the outcome, showing that the family stage can override the default. If a market diagram is wanted, donated organs can be shown as under-provided, with MSB above MPB.",
  "evaluation": [
   "Soft default: the family still has the final say, so the decision is made by grieving relatives under time pressure (bounded rationality), not by the default. Consent was 87% when the person had actively opted in but only 45% when consent was merely deemed.",
   "Framing and the messenger matter more than the law: consent was 61% with a specialist nurse present against 8% without, which suggests how the question is framed shapes the answer more than the legal default does.",
   "Causation is unclear: Covid-19 hit intensive care units just as the law began, and consent has fallen across all UK nations. The right comparison is what consent would have been without the law, which nobody can observe.",
   "Equity: consent is 62% for white patients and 29% for ethnic minority patients, so one nudge does not work equally on all groups. Trust-building and targeted information (an active-choice prompt to register) may achieve more than a passive default."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A rare case where a famous nudge has not delivered, with official NHSBT figures from before and after the change. Weakness: Covid-19 and wider trends make it hard to isolate the effect of the law itself.",
  "sources": [
   "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/39339/activity-report-2025-2026-final.pdf",
   "https://organdonation.nhs.uk/news/increased-public-support-and-new-law-offer-hope-for-patients-despite-impact-of-covid-19/"
  ],
  "mem": {
   "tag": "Opt-out, families decide",
   "story": "May 2020: England presumes everyone is a donor → families are still asked at the bedside → consent slides from 68% to 57% → only 45% when consent is merely deemed → 87% when the person had opted in",
   "numbers": [
    [
     "68%",
     "UK consent rate in 2019/20, before opt-out"
    ],
    [
     "57%",
     "UK consent rate in 2025/26"
    ],
    [
     "602",
     "of 1,092 deemed-consent cases where the family did not support donation, 2025/26"
    ]
   ],
   "use": "limits of nudges, choice architecture, bounded selfishness, evaluating behavioural policy, government intervention in health",
   "but": "Covid-19 hit intensive care just as the law began, so the fall in consent may not be caused by the opt-out itself."
  }
 },
 {
  "id": "china-luxury-demand-slowdown",
  "tk": "CNLUX",
  "title": "China's luxury slump: LVMH fashion sales fall 5% as incomes grow 5%",
  "cue": "China: weak luxury demand despite rising incomes",
  "region": "China (with France and Switzerland)",
  "years": "2024–2026",
  "subtopic": "2.5",
  "concepts": [
   "income elasticity of demand (YED)",
   "luxury",
   "necessity",
   "normal good",
   "change in demand",
   "substitutes"
  ],
  "hook": "China's disposable income per head grew 5.0% in real terms in 2025, yet Swiss watch exports to China fell 12.1% after a 25.8% drop in 2024, and LVMH's fashion and leather goods sales fell 5% in Q3 2026 on weaker Chinese demand.",
  "facts": [
   "National Bureau of Statistics of China (20 January 2026): disposable income per head was 43,377 yuan in 2025, up 5.0% in nominal and real terms; the median was 36,231 yuan, up 4.4%, and consumption spending per head rose 4.4%.",
   "Federation of the Swiss Watch Industry (via FashionUnited, 29 January 2026): Swiss watch exports fell 1.7% to CHF 25.6 billion in 2025. Exports to China fell 12.1% after 25.8% in 2024, and to Hong Kong 6.5% after 18.7%.",
   "Bain and Altagamma (20 November 2025): the personal luxury goods market was forecast at €358 billion in 2025, down from €364 billion (-2% at current exchange rates, flat at constant rates), with mainland China down 3–5%. Luxury consumers fell from about 400 million in 2022 to about 340 million as aspirational buyers pulled back.",
   "LVMH (12 October 2026): revenue of €57.1 billion in the first nine months of 2026, up 2% organically. Fashion and leather goods sales fell 5% organically in Q3 and 2% over nine months, hit by 'the slowdown in demand in China', while the US, Europe and Japan grew."
  ],
  "diagram": "Show demand for luxury goods in China shifting left (D1 to D2) even though average income rose, to show that wealth, confidence and tastes moved demand. To explain YED, compare a necessity (YED between 0 and 1) with a luxury (YED above 1): a slowdown in income growth hits luxury quantity far more.",
  "evaluation": [
   "Luxury goods have YED above 1, so their sales swing more than income. But here incomes still rose 5% while luxury spending fell, so a simple YED calculation would even give a negative number: other demand factors such as falling wealth and weak consumer confidence are doing the work.",
   "Whose income matters: luxury demand depends on richer and aspirational households and on expected future income, not the average. Median income grew only 4.4%, and Bain counts about 60 million fewer luxury buyers worldwide since 2022.",
   "Price and substitutes: brands raised prices sharply (Bain calls the price-value link 'broken'), and Chinese buyers have moved to local brands, resale and cheaper 'accessible' luxury. Part of the fall is a movement along the demand curve or substitution, not an income effect.",
   "Firms: groups selling luxuries are exposed to income and confidence cycles, so they spread risk across regions (LVMH relied on US, European and Japanese growth). Firms selling necessities have steadier revenue in a slowdown."
  ],
  "rating": {
   "relevance": 4,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Fresh company, trade and official income data on a classic luxury good, and a good way to show why YED is hard to measure in practice. Weakness: China's income did not fall, so this is a confidence and wealth story more than a clean YED estimate.",
  "sources": [
   "https://www.lvmh.com/en/publications/continued-growth-in-the-third-quarter-of-2026",
   "https://fashionunited.com/news/business/swiss-watch-exports-contract-by-1-7-percent-in-2025/2026012970300",
   "https://www.bain.com/ja/about-bain/media-center/press-releases/20252/global-luxury-stays-resilient-despite-economic-headwinds-and-shifting-consumer-trends-that-reshape-marketbain--company-and-altagamma",
   "https://www.stats.gov.cn/english/PressRelease/202601/t20260120_1962356.html"
  ],
  "mem": {
   "tag": "Handbags lose China",
   "story": "Chinese incomes still grow 5% → but aspirational buyers pull back → Swiss watch exports to China fall 25.8% then 12.1% → LVMH fashion sales drop 5% in Q3 2026 → luxury demand tracks wealth and confidence, not just income",
   "numbers": [
    [
     "5.0%",
     "real growth in China's disposable income per head, 2025"
    ],
    [
     "12.1%",
     "fall in Swiss watch exports to China, 2025"
    ],
    [
     "5%",
     "organic fall in LVMH fashion and leather goods sales, Q3 2026"
    ]
   ],
   "use": "YED, luxury vs necessity goods, determinants of demand, business risk in a downturn, consumer confidence",
   "but": "With incomes still rising, the fall reflects wealth, confidence and brand price rises more than income, so YED cannot be read off directly."
  }
 },
 {
  "id": "australia-tobacco-excise-black-market",
  "tk": "AUTBC",
  "title": "Australia's tobacco tax: receipts fall from A$16.3bn to A$4.1bn",
  "cue": "Australia: rising tobacco excise and the illicit market",
  "region": "Australia",
  "years": "2013–2026",
  "subtopic": "2.5 (also 2.7)",
  "concepts": [
   "price elasticity of demand (PED)",
   "price elastic demand",
   "price inelastic demand",
   "total revenue (TR)",
   "indirect tax",
   "parallel market"
  ],
  "hook": "Repeated tax rises nearly tripled legal tobacco prices after 2016, but excise receipts fell from A$16.3bn in 2019–20 to a forecast A$4.13bn in 2025–26 as smokers switched to illicit tobacco, which the ABS estimates was 80% of consumption in 2025.",
  "facts": [
   "Tobacco excise rose 12.5% a year from 2013 to 2020, then 5% a year from September 2023 to September 2025 on top of twice-yearly indexation. In March 2025 the excise on a pack of 20 cigarettes was A$28.06 (Tobacco in Australia, Cancer Council Victoria).",
   "ABS (3 June 2026, experimental estimates): legal tobacco prices have almost tripled since December 2016 while illicit prices stayed roughly flat. The illicit share of tobacco consumed rose from 12% in 2017 to 80% in 2025, the legal volume measure fell 73%, and total nicotine consumption rose almost 40% from 2017 to 2025.",
   "2026–27 Budget (May 2026): tobacco excise receipts were A$7.77bn in 2024–25 and are forecast at A$4.13bn in 2025–26, A$1.32bn (24%) below the December 2025 estimate, falling to A$2.14bn by 2029–30. The five-year forecast was cut by A$8.0bn, reflecting 'a weaker outlook for excisable tobacco volumes'.",
   "AAP (December 2025): receipts peaked at A$16.3bn in 2019–20. Legal packs cost up to A$50 and illicit packs from about A$15. Treasurer Jim Chalmers rejected calls to cut the tax. The Illicit Tobacco Commissioner's lower estimate put the illicit share at 50–60% in 2024–25 (ABS)."
  ],
  "diagram": "Draw two demand curves for legal cigarettes: a steep (inelastic) one for when there was no close substitute and a flatter (elastic) one once cheap illicit tobacco is widely available. Add a specific tax shifting supply up. With the flat curve, the legal quantity falls so much that tax revenue (tax per unit × legal quantity) shrinks.",
  "evaluation": [
   "PED depends on substitutes: tobacco is the textbook price inelastic good because it is addictive, which is why governments tax it for revenue. Once a cheap illegal substitute became easy to buy, demand for legal tobacco became price elastic, so each tax rise cut legal sales by more than enough to reduce revenue.",
   "Health goal vs revenue goal: falling legal sales look like success, but total nicotine use rose almost 40% (including vapes), and the illicit market is untaxed, unregulated and linked to organised crime. The tax now does neither job well.",
   "Short run vs long run: PED rose over time as illicit supply networks grew, so earlier estimates of revenue were too high. Options are cutting the tax (backed by research commissioned by a retailer, an interested party) or spending more on enforcement.",
   "Data caveats: the ABS figures are experimental and use modelling such as wastewater data, and estimates of the illicit share range from about 50% to 80%. Falling smoking rates also explain part of the drop in legal sales."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "Shows clearly that PED depends on the availability of substitutes, with official budget figures to prove the revenue effect. Weakness: the size of the illicit market is modelled, and estimates range from about 50% to 80%.",
  "sources": [
   "https://budget.gov.au/content/bp1/download/bp1_bs-5.pdf",
   "https://www.abs.gov.au/articles/household-consumption-illicit-tobacco-and-nicotine-products",
   "https://aapnews.aap.com.au/news/budget-takes-8-2b-hit-thanks-to-black-market-tobacco",
   "https://www.tobaccoinaustralia.org.au/chapter-13-taxation/13-2-tobacco-taxes-in-australia",
   "https://www.canberratimes.com.au/story/9246138/up-in-smoke-budget-loses-8b-more-to-illicit-tobacco/"
  ],
  "mem": {
   "tag": "Taxed into the black market",
   "story": "Tax rises push legal packs towards A$50 → illicit packs at about A$15 become a close substitute → demand for legal tobacco turns price elastic → legal volumes fall 73% → excise receipts collapse from A$16.3bn to A$4.13bn",
   "numbers": [
    [
     "A$16.3bn",
     "tobacco excise receipts at their peak, 2019–20"
    ],
    [
     "A$4.13bn",
     "forecast tobacco excise receipts, 2025–26"
    ],
    [
     "80%",
     "illicit share of tobacco consumed in 2025 (ABS estimate)"
    ]
   ],
   "use": "PED and its determinants, PED and tax revenue, indirect taxes on demerit goods, parallel markets, government failure",
   "but": "Falling smoking rates also cut legal sales, so not all of the revenue loss is people switching to the black market."
  }
 },
 {
  "id": "germany-deutschlandticket-price-rises",
  "tk": "DTKT",
  "title": "Deutschlandticket: an 18% price rise, about 6% fewer subscribers",
  "cue": "Germany: price rises for the Deutschlandticket",
  "region": "Germany",
  "years": "2023–2027",
  "subtopic": "2.5 (also 2.7)",
  "concepts": [
   "price elasticity of demand (PED)",
   "price inelastic demand",
   "price elastic demand",
   "total revenue (TR)",
   "subsidy",
   "substitutes"
  ],
  "hook": "When Germany's nationwide local transport pass rose from €49 to €58 a month in January 2025 (+18%), subscriptions fell only about 6%; after a further rise to €63 in 2026 just 5.75% of holders cancelled.",
  "facts": [
   "The Deutschlandticket, valid on all local and regional buses and trains, launched in May 2023 at €49 a month. It rose to €58 on 1 January 2025 and €63 on 1 January 2026 (The Local, September 2025), and will cost €66.80 from 1 January 2027 under a new cost-based price index (Bavarian Transport Ministry, 30 September 2026).",
   "VDV and Deutsche Bahn market research (heise, July 2025): subscriptions fell from 14.2 million in Q4 2024 to 13.5 million in Q1 2025, and researchers linked about 430,000 of the losses to the price rise. The 6% fall was smaller than the 9% expected, but subscriptions among 14–29-year-olds fell by more than 36% and job tickets by about 16%.",
   "VDV (27 January 2026): about 8% of holders cancelled after the 2025 rise but only 5.75% after the 2026 rise. About 14.6 million people held the ticket at the end of 2025 (74% standard, 15% job tickets, 11% semester tickets), and local public transport carried 9.86 billion passengers in 2025, up 0.8%.",
   "The federal and state governments pay about €3 billion a year to make up operators' lost fare revenue, and the VDV warned of a funding gap of about €400 million (heise, July 2025)."
  ],
  "diagram": "Draw a steep (price inelastic) demand curve and show the price rise from €49 to €58. Shade the revenue gained (higher price on remaining subscribers) and the revenue lost (subscribers who left × old price): the gain is larger, so total revenue rises. Add a flatter curve to show the more price elastic demand of young people.",
  "evaluation": [
   "Rough PED: a 6% fall in subscriptions after an 18% price rise gives PED of about -0.3, so demand is price inelastic and the rise increased total revenue, easing the subsidy bill. The ticket was still far cheaper than most monthly passes it replaced, and driving is expensive, so close substitutes were few.",
   "Different groups, different elasticities: subscriptions among 14–29-year-olds fell by more than 36%, suggesting price elastic demand where the ticket is a bigger share of income and cheaper options (bikes, semester tickets) exist.",
   "Measurement problems: cancellation rates include people who would have left anyway (moving, changing jobs, seasonal patterns), so the price effect is an estimate, not a controlled result. PED may also rise in the long run as people change how they travel.",
   "Policy aim: the ticket was meant to shift people from cars to public transport (reducing negative externalities). The price has risen about 36% from €49 to €66.80 in under four years while passenger numbers grew only 0.8% in 2025, so higher fares may work against that aim."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A clean, recent price change with before-and-after numbers that let a student calculate PED and link it to revenue. Weakness: cancellation figures mix the price effect with normal turnover, so the PED is only an estimate.",
  "sources": [
   "https://www.vdv.de/260127-pm-oepnv-bilanz-2025.pdfx",
   "https://heise.de/-10474025",
   "https://www.stmb.bayern.de/med/pressemitteilungen/pressearchiv/2026/115/index.php",
   "https://www.thelocal.de/20250918/e63-ticket-deutschlandticket-price-increase-locked-in-for-2026"
  ],
  "mem": {
   "tag": "The €49 ticket",
   "story": "€49 nationwide pass in 2023 → €58 in 2025, an 18% rise → only about 6% of subscribers leave, but young riders quit → €63 in 2026 and just 5.75% cancel → inelastic demand means fare rises raise revenue",
   "numbers": [
    [
     "€58",
     "monthly price from January 2025, up from €49"
    ],
    [
     "430,000",
     "subscriptions lost because of the 2025 price rise"
    ],
    [
     "5.75%",
     "cancellation rate after the 2026 rise to €63"
    ]
   ],
   "use": "calculating PED, PED and total revenue, determinants of PED, subsidies for public transport, externalities and merit goods",
   "but": "Subscriptions among 14–29-year-olds fell by more than 36%, so demand looks price elastic for lower-income groups."
  }
 },
 {
  "id": "auckland-upzoning-housing-supply",
  "tk": "AKLUP",
  "title": "Auckland upzoning: about 27,000 extra homes consented in five years",
  "cue": "Auckland: upzoning under the Unitary Plan",
  "region": "New Zealand",
  "years": "2016–2026",
  "subtopic": "2.6",
  "concepts": [
   "price elasticity of supply (PES)",
   "price inelastic supply",
   "price elastic supply",
   "spare capacity",
   "change in supply",
   "short run"
  ],
  "hook": "In 2016 Auckland allowed townhouses and apartments on about three-quarters of its residential land; one study estimates 27,183 extra homes were consented in five years, and another finds rents six years later were 28% lower than they would otherwise have been.",
  "facts": [
   "The Auckland Unitary Plan (2016) removed single-dwelling rules on three-quarters of residential land and trebled the number of homes that could legally be built there (Greenaway-McGrevy and Phillips, Journal of Urban Economics, 2023).",
   "The same study compares upzoned and non-upzoned areas from 2010 to 2021 and estimates 27,183 additional dwellings were permitted in the five years after upzoning, about 5.13% of Auckland's dwelling stock, mostly attached housing such as townhouses.",
   "Motu review (November 2024): a second study comparing Auckland with similar New Zealand cities finds about 43,500 extra consents within six years (about 9% of the stock), and a third finds rents six years after the plan were 28% lower than otherwise. Critics argue these counterfactuals overstate the effect and that consents are not the same as net new homes.",
   "Auckland Council (August 2026): 17,097 dwellings were consented in the year to June 2026 and 13,540 completed. In June 2026, 54% of new consents were townhouses, flats, units or other attached homes, and the median sale price in July 2026 was NZ$940,000."
  ],
  "diagram": "Housing market with two supply curves: a steep, price inelastic S1 (strict zoning) and a flatter, more elastic S2 (after upzoning). Show the same rise in demand (D1 to D2) on both: with S1 the price rises a lot and quantity barely changes; with S2 quantity rises more and price less. Stress that upzoning makes supply more elastic, not just shifts it.",
  "evaluation": [
   "Determinants of PES: housing supply is price inelastic mainly because land with planning permission is scarce and building takes years. Upzoning created spare capacity of buildable land, so builders could respond to high prices, and the effect grew over time as more attached homes were built.",
   "Counterfactual debate: all estimates compare Auckland with what might have happened otherwise, and critics say the comparisons are shaky. Consents are not completions, and demolitions mean net additions are smaller. Interest rates, migration and building costs also changed.",
   "Stakeholders: renters and first-time buyers gain from lower rents and prices than otherwise, while existing owners see slower price growth and neighbours may object to density, traffic and pressure on infrastructure such as water and transport.",
   "Lower than otherwise is not affordable: the median sale price is still NZ$940,000. Other supply constraints (infrastructure, construction workers, materials) can become the binding limit on PES once zoning is relaxed."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "The best real case of a policy designed to raise the PES of housing, with peer-reviewed estimates and live council data. Weakness: the effects rest on disputed counterfactuals, and the main studies cover 2016–2022.",
  "sources": [
   "https://eprints.soton.ac.uk/476826/1/Upzoning_Consents_JUE_R2_v2.pdf",
   "https://motu-www.motu.org.nz/wpapers/24_07.pdf",
   "https://www.knowledgeauckland.org.nz/media/xgtembqm/auckland-monthly-housing-update-08august-2026.pdf"
  ],
  "mem": {
   "tag": "Auckland builds up",
   "story": "Auckland homes are costly and zoning blocks building → 2016 plan allows townhouses on three-quarters of land → about 27,000 extra homes consented in five years → rents estimated 28% lower than otherwise → housing supply becomes more price elastic",
   "numbers": [
    [
     "27,183",
     "extra dwellings consented in the five years after upzoning"
    ],
    [
     "28%",
     "how much lower rents were than otherwise, six years on"
    ],
    [
     "17,097",
     "dwellings consented in Auckland in the year to June 2026"
    ]
   ],
   "use": "PES and its determinants, housing supply, short run vs long run supply, government policy to raise supply, housing affordability",
   "but": "Critics argue the counterfactuals are shaky and that consents overstate net new homes once demolitions are counted."
  }
 },
 {
  "id": "korea-memory-chip-supply-squeeze",
  "tk": "DRAM",
  "title": "Memory chips: DRAM contract prices up about 95% in one quarter",
  "cue": "South Korea: AI demand and the memory chip squeeze",
  "region": "South Korea (global market)",
  "years": "2025–2028",
  "subtopic": "2.6 (also 2.2, 2.3)",
  "concepts": [
   "price elasticity of supply (PES)",
   "price inelastic supply",
   "spare capacity",
   "change in quantity supplied",
   "rationing function",
   "competitive supply"
  ],
  "hook": "AI data centres pushed conventional DRAM contract prices up about 93–98% in Q1 2026, with a further 58–63% forecast for Q2, because new chip plants take at least three years to build and global DRAM capacity is expected to grow only about 4.8% a year.",
  "facts": [
   "TrendForce (1 June 2026): conventional DRAM contract prices rose about 93–98% quarter on quarter in Q1 2026 and were forecast to rise another 58–63% in Q2. Supplier inventories were 'extremely low', and output growth came mainly from upgrading existing lines, because new cleanrooms take a long time to build.",
   "TrendForce (3 July 2026): Q3 2026 rises were expected to slow to 13–18% as PC and smartphone buyers were 'reaching their affordability limit', with higher retail prices likely to weigh on device sales.",
   "Korea JoongAng Daily (12 March 2026): Samsung's P5 plant at Pyeongtaek is due for completion in the first half of 2027, with mass production targeted for late 2028. SK hynix's first Yongin fab is due in February 2027 and should add 150,000 wafers a month. SEMI expects global DRAM capacity to grow about 4.8% a year to 2030.",
   "SK Group chairman Chey Tae-won (Korea JoongAng Daily, June 2026): a new memory fab takes at least three years to build; SK hynix aims to double wafer capacity within five years, and the shortage will last through 2030. TrendForce expects high-bandwidth memory (HBM) for AI to take 22% of DRAM wafer input in 2026, up from 18%, and 30% by 2027."
  ],
  "diagram": "Draw a steep (price inelastic) short-run supply curve for DRAM. Shift demand right (AI servers): price rises sharply while quantity barely changes. Add a flatter long-run supply curve to show that once new fabs open in 2027–2028, the same demand increase would cause a much smaller price rise.",
  "evaluation": [
   "Why PES is so low: there is no spare capacity, plants cost billions and take three or more years to build, and output is limited by cleanroom space, equipment, electricity and water. In the short run firms can only squeeze more out of existing lines.",
   "Competitive supply: chipmakers are moving wafers to high-margin HBM for AI, which cuts the supply of ordinary DRAM for PCs and phones even further. The price mechanism rations the scarce chips towards the buyers willing to pay most.",
   "Stakeholders: Korean producers such as Samsung and SK hynix gain large producer surplus, while device makers and consumers pay more. Big cloud buyers with long-term contracts are partly shielded, so price rises fall harder on smaller customers.",
   "Short run vs long run: supply becomes more elastic as new plants open in 2027–2028, and memory has a history of boom-and-bust cycles, so today's high prices could turn into a glut. Most figures here are forecasts from one research firm, TrendForce."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A striking, current case of inelastic supply meeting a demand surge, with clear reasons why supply cannot respond quickly. Weakness: most price figures come from one private research firm and include forecasts.",
  "sources": [
   "https://www.trendforce.com/presscenter/news/20260601-13070.html",
   "https://www.trendforce.com/presscenter/news/20260703-13134.html",
   "https://www.koreajoongangdaily.com/business/samsung-and-sk-are-expanding-fast-but-why-is-memory-still-in-short-supply/12526698",
   "https://www.koreajoongangdaily.com/business/sk-hynix-to-double-wafer-production-within-five-years-chief-says/12529494"
  ],
  "mem": {
   "tag": "Chips can't keep up",
   "story": "AI servers need huge amounts of memory → plants are full and new ones take three years or more → DRAM contract prices nearly double in Q1 2026 → wafers shift to high-margin HBM → new Korean fabs arrive in 2027–2028",
   "numbers": [
    [
     "95%",
     "rough rise in conventional DRAM contract prices in Q1 2026 (TrendForce: 93–98%)"
    ],
    [
     "4.8%",
     "expected yearly growth in global DRAM capacity to 2030"
    ],
    [
     "150,000",
     "wafers a month to be added by SK hynix's first Yongin fab"
    ]
   ],
   "use": "PES and its determinants, spare capacity, short run vs long run supply, price mechanism and rationing, competitive supply",
   "but": "Supply will become more elastic once new plants open in 2027–2028, and past memory booms have ended in gluts."
  }
 },
 {
  "id": "catalonia-rent-cap",
  "tk": "CATR",
  "title": "Barcelona rent cap: rents down about 3%, contracts down about 20%",
  "cue": "Catalonia: capping rents in stressed housing areas",
  "region": "Catalonia (Barcelona), Spain",
  "years": "2024–2026",
  "subtopic": "2.7",
  "concepts": [
   "price ceiling (maximum price)",
   "excess demand (shortage)",
   "parallel market",
   "welfare loss (deadweight loss)",
   "price elasticity of supply",
   "equity"
  ],
  "hook": "Since March 2024 Catalonia has capped rents on new contracts in 'stressed' areas, now 271 towns with about 90% of its population. By the first nine months of 2025, Barcelona contract rents were about 3% below early 2024, but the number of contracts signed was about 20% lower.",
  "facts": [
   "Ara (15 March 2025): the cap began in mid-March 2024 in 140 municipalities; 131 more were added, making 271 with about 7 million people (90% of Catalonia). Seasonal contracts, which fall outside the cap, rose 44.9% in 2024, though the government says they are under 15% of new contracts.",
   "INCASOL data (first nine months of 2025, reported February 2026): the average rent paid in Barcelona was €1,125.30, down 2.4% year on year and about 3% below Q1 2024. Contracts signed fell to 22,881, down 9.4% year on year, about 20% fewer than in Q1 2024 and almost 50% below the 2021 peak.",
   "Idealista asking rents in Barcelona rose from €21.18 to €23.73 per square metre over the same year, up more than 12%, and about 13% since the cap began. The cap applies to contract rents, not to what landlords advertise.",
   "Pérez García (arXiv preprint, posted February 2026, not peer-reviewed): in the main estimate the 2024 cap cut rent growth by about 3 percentage points and tenancy agreements by about 6.6 per 10,000 people (about 13%). Under other methods the rent effect largely disappears, while the fall in supply stays robust.",
   "Monras and Montalvo (San Francisco Fed working paper, September 2023), on Catalonia's earlier 2020 cap: rents fell overall, but units left the top of the market and new low-priced supply did not replace them."
  ],
  "diagram": "Price ceiling in the rental market: maximum rent set below equilibrium, so quantity demanded rises and quantity supplied falls, creating excess demand (shortage). Shade the welfare loss triangle and the transfer from landlords to tenants who still find a flat. Draw supply fairly inelastic in the short run and more elastic in the long run, so the shortage grows over time.",
  "evaluation": [
   "Winners and losers: tenants who sign capped contracts pay less, but fewer contracts are signed, so newcomers and young people may find it harder to rent at all. The gain to insiders comes partly at the cost of outsiders.",
   "Avoiding the cap: the rise in seasonal contracts (+44.9% in 2024) and asking rents rising 12% while contract rents fell suggest landlords shift to uncapped forms, a kind of parallel market. The government argues the scale is small (under 15% of contracts).",
   "Evidence is mixed: studies agree supply falls, but disagree on how much rents fall. The newest study is a preprint with weak control data, and the fall in contracts may also reflect high interest rates and owners selling.",
   "Alternatives: the root problem is too little supply, so building social housing, relaxing planning rules or subsidising construction tackle the cause, while a cap only treats the symptom in the short run."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The best recent European price ceiling, with official contract data showing both the intended price effect and the predicted fall in supply. Weakness: causation is disputed and the newest study is not peer-reviewed.",
  "sources": [
   "https://en.ara.cat/economy/rent-prices-have-fallen-by-6-4-in-barcelona-and-by-3-7-in-stressed-areas-since-the-peak_1_5315176.html",
   "https://www.spanishpropertyinsight.com/2026/02/24/barcelona-rent-controls-nine-months-into-2025",
   "https://arxiv.org/html/2602.08631v1",
   "https://www.frbsf.org/research-and-insights/publications/working-papers/2023/09/the-effect-of-second-generation-rent-controls-new-evidence-from-catalonia/"
  ],
  "mem": {
   "tag": "Barcelona rent lid",
   "story": "Rents soar in Barcelona → March 2024 cap on new contracts in stressed areas → 271 towns, 90% of Catalans covered → contract rents slip about 3% → contracts signed fall about 20% while asking rents rise 12%",
   "numbers": [
    [
     "271",
     "Catalan municipalities under the rent cap"
    ],
    [
     "€1,125.30",
     "average Barcelona contract rent, first nine months of 2025"
    ],
    [
     "9.4%",
     "year-on-year fall in Barcelona rental contracts, first nine months of 2025"
    ]
   ],
   "use": "price ceilings, rent controls, shortages, unintended consequences, equity vs efficiency, short vs long run supply",
   "but": "Contract rents fell slightly, but about a fifth fewer rental contracts were signed, so fewer people get the cheaper flats."
  }
 },
 {
  "id": "india-urea-subsidy",
  "tk": "UREA",
  "title": "India: farmers pay about Rs 300 for a urea bag costing Rs 3,000",
  "cue": "India: subsidised urea fertiliser at a fixed price",
  "region": "India",
  "years": "2022–2026",
  "subtopic": "2.7",
  "concepts": [
   "subsidy",
   "price ceiling (maximum price)",
   "parallel market",
   "welfare loss (deadweight loss)",
   "opportunity cost",
   "primary commodities"
  ],
  "hook": "India fixes the price of a 45 kg bag of urea at Rs 242 before taxes. In October 2026 the finance minister said the state was paying about Rs 2,700 a bag as import costs reached Rs 3,000, and officials warned the fertiliser subsidy could pass Rs 3 lakh crore against a budget of Rs 1.7 lakh crore.",
  "facts": [
   "Finance Minister Nirmala Sitharaman (2 October 2026): the Centre absorbs about Rs 2,700 per bag of urea, with West Asia conflict pushing import costs up to Rs 3,000 a bag, while farmers pay about Rs 300. The MRP is Rs 242 per 45 kg bag before neem coating and taxes.",
   "Budget 2026-27: fertiliser subsidy of Rs 1.7 lakh crore (Rs 1.16 lakh crore urea, Rs 54,000 crore phosphate and potash). In May 2026 a Department of Fertilisers Joint Secretary said the bill could pass Rs 3 lakh crore, and up to Rs 3.5 lakh crore if high prices last into the Rabi season.",
   "World urea prices rose from about $482 a tonne in late February 2026 to about $795 in early April (nearly +65%), and a recent Indian import tender paid $935–959 a tonne (May 2026).",
   "Argus (2 February 2026): the 2025-26 subsidy on imported urea ended up at about Rs 0.52 trillion, against an original plan of Rs 0.21 trillion.",
   "Department of Fertilisers (2022): about 1 million tonnes of farm-grade urea is diverted each year to industries such as plywood, resin, glue and cattle feed, a subsidy leakage of nearly Rs 6,000 crore, with campaigns near the Nepal border to stop smuggling."
  ],
  "diagram": "Maximum price with a subsidy: draw the supply price at the import or production cost (about Rs 3,000 a bag) and the fixed farm price far below it. The government pays the gap times the quantity sold (the subsidy rectangle). Because the price is so low, quantity demanded is above the social optimum, giving a welfare loss triangle, and the gap between the fixed price and the market value creates a parallel market.",
  "evaluation": [
   "Stakeholders: farmers and food consumers are shielded from a world price shock, protecting food supply and rural incomes, but taxpayers carry a bill that may double. The opportunity cost could be irrigation, health or education spending.",
   "Leakage and government failure: a price this far below market value makes diversion and smuggling profitable; the estimated Rs 6,000 crore a year leaks to non-farm users and neighbouring countries.",
   "Price signals: a price fixed for years gives farmers no reason to economise when world costs rise, and keeps urea cheap relative to other nutrients, which may encourage overuse; the soil and water effects would need checking.",
   "Alternatives: direct cash transfers to farmers per hectare, letting the price reflect cost, would keep the help but restore the price signal and cut diversion, though identifying tenant farmers is hard. In a short-run shock, a temporary subsidy may still be justified."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A large, live subsidy and maximum-price case, made sharper by the 2026 world urea price spike, with official figures on cost and leakage. Weakness: the leakage estimate dates from 2022 and the final 2026-27 bill is still a projection.",
  "sources": [
   "https://www.newkerala.com/news/a/govt-absorbing-up-rs-2700-per-urea-bag-555.htm",
   "https://www.kotakneo.com/news/sectors/india-fertiliser-subsidy-fy27-west-asia-crisis-urea-prices-surge/",
   "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2783524-india-outlines-2026-27-urea-subsidy",
   "https://www.outlookbusiness.com/amp/story/news/govt-cracks-down-on-urea-diversion-to-industries-aims-to-plug-rs-6-000-crore-subsidy-leakage-news-208733"
  ],
  "mem": {
   "tag": "India's cheap urea",
   "story": "Urea bag price fixed at Rs 242 → West Asia conflict lifts import cost to Rs 3,000 a bag → state absorbs about Rs 2,700 a bag → subsidy bill heads past Rs 3 lakh crore → cheap urea leaks to factories and across borders",
   "numbers": [
    [
     "Rs 242",
     "fixed price of a 45 kg urea bag before taxes"
    ],
    [
     "Rs 2,700",
     "subsidy per bag, October 2026"
    ],
    [
     "Rs 1.7 lakh crore",
     "fertiliser subsidy budget, 2026-27"
    ]
   ],
   "use": "subsidies, maximum prices, parallel markets, government failure, opportunity cost, agriculture and food security",
   "but": "Without the subsidy, a tenfold gap between cost and price would fall on poor farmers in the middle of a world price shock, threatening food output."
  }
 },
 {
  "id": "nigeria-petrol-subsidy-removal",
  "tk": "NGFS",
  "title": "Nigeria: petrol from ₦189 to ₦1,596 a litre after the subsidy ended",
  "cue": "Nigeria: scrapping the petrol subsidy",
  "region": "Nigeria",
  "years": "2021–2026",
  "subtopic": "2.7 (also 2.12)",
  "concepts": [
   "subsidy",
   "price ceiling (maximum price)",
   "parallel market",
   "welfare loss (deadweight loss)",
   "opportunity cost",
   "equity"
  ],
  "hook": "Before May 2023 Nigeria held petrol at about ₦189 a litre, with a subsidy costing about $867 million a month. After President Tinubu ended it, prices nearly tripled at once, and by May 2026 the average pump price was ₦1,596.25.",
  "facts": [
   "Reuters (30 May 2023): a day after President Tinubu said the subsidy would be scrapped, an NNPC circular showed petrol rising from ₦189 to as much as ₦557 a litre. NNPC put the subsidy at $867 million a month and said the government owed it $6.1 billion.",
   "World Bank Nigeria Development Update (November 2021): the petrol subsidy cost about $4.5 billion, roughly 2% of GDP or 35% of oil and gas revenue. The bottom 40% of earners made under 3% of petrol purchases, and smugglers and black marketeers captured a large share.",
   "World Bank projection (2023): removal would save about ₦2 trillion (0.9% of GDP) in 2023 and over ₦11 trillion over 2023–2025 compared with keeping the subsidy. These are projections, not audited outturns.",
   "NBS Price Watch: the average retail petrol price was ₦1,596.25 a litre in May 2026, up 55.31% from ₦1,027.76 in May 2025 and 4.13% up on April. Analysts blamed Middle East tensions and the closure of the Strait of Hormuz, which pushed up Brent crude."
  ],
  "diagram": "Draw the old regime as a price ceiling below equilibrium (₦189), with the shortfall between quantity demanded and the quantity firms would supply covered by state payments, so it works like a subsidy: supply shifts right to S + subsidy, consumers pay less, quantity rises above the social optimum and there is a welfare loss triangle plus a large government spending rectangle. Removal shifts supply back left: price rises, quantity falls and the spending rectangle disappears.",
  "evaluation": [
   "Equity: the subsidy was regressive, since the bottom 40% made under 3% of petrol purchases, so removal is fairer in principle. But the price shock passed into transport and food costs, which hurt poor households most, so the result depends on whether the savings are spent on them.",
   "Opportunity cost: about $867 million a month could fund health, education or infrastructure instead. The ₦11 trillion savings figure is a World Bank projection, so students should treat it as an estimate.",
   "Parallel market: a fixed low price well below neighbouring countries' prices encouraged smuggling across borders. Removing the gap removes the incentive to smuggle.",
   "Short vs long run: without a subsidy, world oil shocks pass straight to consumers, as the 2026 Hormuz closure showed (+55% year on year). This creates political pressure to bring the subsidy back, a common form of government failure."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A clear before-and-after subsidy case with prices, fiscal cost and distribution data from Reuters, the World Bank and NBS. Weakness: the savings figures are projections and the 2026 price rise mixes the removal with a world oil shock.",
  "sources": [
   "https://hydrocarbonprocessing.com/news/2023/05/nigeria-to-triple-petrol-prices-after-president-says-subsidy-to-end",
   "https://blueprint.ng/smugglers-wealthy-households-major-beneficiaries-of-4-5bn-subsidy-world-bank/",
   "https://ripplesnigeria.com/world-bank-projects-nigerias-subsidy-savings-to-hit-n11tr-by-2025",
   "https://gazettengr.com/petrol-price-stood-at-n1596-25-per-litre-in-may-nbs/"
  ],
  "mem": {
   "tag": "Nigeria pump shock",
   "story": "Petrol held at ₦189 a litre → subsidy costs $867m a month and mostly helps the better-off → Tinubu ends it in May 2023 → price nearly triples overnight → ₦1,596 a litre by May 2026 as world oil spikes",
   "numbers": [
    [
     "₦189",
     "regulated petrol price per litre before May 2023"
    ],
    [
     "$867 million",
     "monthly cost of the subsidy (NNPC, 2023)"
    ],
    [
     "₦1,596.25",
     "average pump price per litre, May 2026 (NBS)"
    ]
   ],
   "use": "subsidies, price ceilings, removing subsidies, opportunity cost of government spending, equity, parallel markets",
   "but": "The poorest gained little from the subsidy, but they also have the least ability to cope when fuel and transport costs triple."
  }
 },
 {
  "id": "eu-ets-carbon-price",
  "tk": "EUETS",
  "title": "EU ETS: emissions 51.8% below 2005 with carbon at about €82 a tonne",
  "cue": "EU Emissions Trading System: cap and trade for carbon",
  "region": "European Union",
  "years": "2005–2026",
  "subtopic": "2.8",
  "concepts": [
   "tradable permits (cap and trade)",
   "externality",
   "marginal private cost (MPC)",
   "marginal social cost (MSC)",
   "carbon tax",
   "market failure"
  ],
  "hook": "Emissions from installations in the EU ETS were 1,009 MtCO2e in 2025, 51.8% below 2005, and allowances traded at about €82 a tonne in August 2026. Auctions raised €38.8 billion in 2024.",
  "facts": [
   "European Commission Carbon Market Report (3 December 2025): emissions from power and industry are about 50% below 2005, on track for the 2030 target of -62%. Power sector emissions fell nearly 11% in 2024, and auctions raised €38.8 billion in 2024 and over €250 billion in total.",
   "Preliminary data (April 2026): ETS emissions fell only 1.3% in 2025 compared with 2024. Resources for the Future puts verified 2025 emissions at 1,009 MtCO2e, 51.8% below 2005.",
   "Carbon price: EU allowances traded at €82–84 a tonne in August 2026, averaging €82.3. Average quarterly auction prices were €75.36 in Q1 and €82.32 in Q3 2026.",
   "Commission review proposal (17 July 2026): the cap would fall more slowly so that it reaches zero in 2048 rather than by 2039, and 20% of free allowances would be paid only after firms show they invested in decarbonisation. Parliament and Council must still agree.",
   "ETS2, a separate carbon price on road fuel and heating, was pushed back a year to 2028 under a provisional deal in December 2025."
  ],
  "diagram": "Negative production externality: MSC above MPC (supply), market output Qm above the social optimum Q*, with a welfare loss triangle. Then draw the permit market: a vertical supply of permits set by the cap and downward-sloping demand from firms; cutting the cap shifts supply left and raises the permit price, which raises firms' costs towards MSC.",
  "evaluation": [
   "Effectiveness: emissions roughly halved since 2005, but part of the fall came from cheap renewables, switching from coal to gas and weak industry, not only the price. The small 2025 fall (-1.3%) suggests the easy cuts in power are mostly done.",
   "Cap and trade vs carbon tax: a cap gives certainty about the quantity of emissions but not the price, which moved between about €75 and €84 in 2026. A tax gives a known price but an uncertain quantity.",
   "Government failure and lobbying: free allowances, a flatter cap in the 2026 proposal and the ETS2 delay show political pressure from industry and worries about household fuel costs. Regulators also cannot measure MSC exactly, so €82 may be above or below the true external cost.",
   "Revenue: €38.8 billion a year can fund green investment or compensate poorer households, which a command and control rule would not raise."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "The textbook tradable permits case, with official emissions, price and revenue data and a live 2026 reform debate to evaluate. Weakness: it is hard to separate the carbon price's effect from cheaper renewables and gas switching.",
  "sources": [
   "https://climate.ec.europa.eu/news-other-reads/news/2025-carbon-market-report-eu-ets-lowers-power-sector-emissions-and-expands-maritime-transport-2025-12-03_en",
   "https://www.rff.org/publications/issue-briefs/the-european-union-emissions-trading-system-what-can-we-learn-from-the-proposed-changes-to-one-of-the-worlds-longest-running-carbon-pricing-policies/",
   "https://gmk.center/en/news/the-european-commission-has-announced-the-price-of-cbam-certificates-for-q3-2026/",
   "https://www.hellenicshippingnews.com/eu-ets-emissions-fall-1-3-in-2025-maritime-emissions-down-3/",
   "https://oenergetice.cz/en/co2-emissions/analysts-ets-2-delay-gives-more-time-to-prepare-but-does-not-change-rising-costs"
  ],
  "mem": {
   "tag": "Europe's carbon cap",
   "story": "EU caps CO2 from power and industry in 2005 → firms buy and trade allowances → price around €82 a tonne in 2026 → emissions 51.8% below 2005 → 2026 proposal slows the cap and ETS2 slips to 2028",
   "numbers": [
    [
     "51.8%",
     "fall in ETS emissions, 2005 to 2025"
    ],
    [
     "€82.3",
     "average allowance price per tonne, August 2026"
    ],
    [
     "€38.8 billion",
     "auction revenue, 2024"
    ]
   ],
   "use": "tradable permits, carbon tax comparison, negative production externalities, climate change, government failure",
   "but": "Much of the fall in emissions came from cheaper renewables and gas switching, and the latest year cut emissions by only 1.3%."
  }
 },
 {
  "id": "northeast-atlantic-mackerel",
  "tk": "MACK",
  "title": "North-East Atlantic mackerel: 2026 catches 128% above scientific advice",
  "cue": "North-East Atlantic mackerel: countries fishing above the advice",
  "region": "North-East Atlantic (Norway, UK, Iceland, Faroe Islands, EU, Greenland)",
  "years": "2010–2026",
  "subtopic": "2.8",
  "concepts": [
   "common pool resource",
   "tragedy of the commons",
   "rivalry",
   "excludability",
   "command and control regulation",
   "market failure"
  ],
  "hook": "Scientists (ICES) advised a 2026 mackerel catch of no more than 174,357 tonnes, but with no deal on how to share the stock, catches were estimated at about 398,000 tonnes, 128% above the advice. The spawning stock of about 3.2 million tonnes sits just above the critical limit of 3.07 million.",
  "facts": [
   "MSC (30 September 2025): ICES advised a 77% cut in 2026 catches; mackerel catches had exceeded scientific advice by an average of 39% over the past 15 years, and the fisheries lost MSC sustainability certification over five years earlier.",
   "December 2025: the UK, Norway, the Faroe Islands and Iceland agreed a 2026 total catch of 299,010 tonnes (a 48% cut), well above ICES's 174,357 tonnes. The EU and Greenland were not part of the deal and there is no agreement on shares.",
   "ICES advice (30 September 2026): the 2027 catch should be no more than 352,938 tonnes, more than double the 2026 advice, thanks to a modest rise in spawning stock, stronger recruitment and heavier fish. Catches in 2026 were estimated at 398,186 tonnes, about 128% above the 2026 advice (MSC analysis).",
   "The 2026 spawning stock of about 3.2 million tonnes is just above the critical limit (3.07 million) and below the precautionary level (4.12 million). Even at the advised catch there is a 33.2% chance of falling below the critical limit in 2028."
  ],
  "diagram": "No single IB diagram fits a common pool resource, so use a negative production externality diagram: each fleet's MPC ignores the cost its catch imposes on other fleets and future catches, so MSC lies above MPC and the quantity caught is too high. Also explain with the 2x2 grid that the stock is rivalrous but non-excludable.",
  "evaluation": [
   "Tragedy of the commons between countries: each state gains by setting its own quota, and with no agreement on shares the national quotas add up to more than the science allows. Fixing it needs international cooperation, which no single government can impose.",
   "Government failure: quotas are command and control regulation, but they have been set politically above advice (39% average overshoot), so regulation exists without protecting the stock.",
   "Short vs long run: high catches protect fishing and processing jobs in Norway, Scotland and Ireland now, but risk a collapse that would cost those same jobs later. Losing MSC certification already hurts sales to retailers.",
   "Uncertainty: the industry disputes the science, and the advice doubled between 2026 and 2027, so stock estimates move a lot. The partial recovery shows cuts can work if catches follow advice."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A live tragedy of the commons with scientific advice, actual catches and stock levels to compare, and a clear failure of international cooperation. Weakness: the figures are from fisheries bodies and trade press reporting ICES, and stock estimates are revised often.",
  "sources": [
   "https://www.msc.org/media-centre/press-releases/press-release/mackerel-supplies-under-threat-as-new-scientific-advice-recommends-77--cut-to-catches-in-northeast-atlantic",
   "https://weareaquaculture.com/news/fisheries/norway-uk-iceland-and-faroe-islands-agree-to-a-48-reduction-in-mackerel-quota-2",
   "https://www.bairdmaritime.com/fishing/regulation-enforcement/northeast-atlantic-mackerel-advice-2027",
   "https://thefishsite.com/articles/ices-raises-pelagic-catch-advice-as-msc-urges-quota-agreements"
  ],
  "mem": {
   "tag": "Mackerel free-for-all",
   "story": "Mackerel stock shared by six parties with no deal on shares → quotas set 39% above advice on average → stock falls near the critical limit → ICES asks for a 77% cut for 2026 → catches still 128% above advice",
   "numbers": [
    [
     "174,357 tonnes",
     "ICES advised maximum catch for 2026"
    ],
    [
     "398,186 tonnes",
     "estimated actual mackerel catch, 2026"
    ],
    [
     "39%",
     "average amount catches exceeded advice over 15 years"
    ]
   ],
   "use": "common pool resources, tragedy of the commons, sustainability, international cooperation, government failure, quotas",
   "but": "ICES more than doubled its advice for 2027, so the stock is recovering despite the overfishing and the science is uncertain."
  }
 },
 {
  "id": "london-ulez",
  "tk": "ULEZ",
  "title": "London ULEZ: £12.50 a day and 96.7% of vehicles now compliant",
  "cue": "London: the Ultra Low Emission Zone charge",
  "region": "London, United Kingdom",
  "years": "2019–2025",
  "subtopic": "2.8 (also 2.7)",
  "concepts": [
   "externality",
   "marginal private benefit (MPB)",
   "marginal social benefit (MSB)",
   "indirect tax",
   "command and control regulation",
   "subsidy"
  ],
  "hook": "Drivers of older, more polluting vehicles pay £12.50 a day to drive anywhere in London. City Hall says compliance reached 96.7% and roadside NO2 was 27% lower in 2024 than without the ULEZ, but an independent study found no significant extra fall from the 2023 London-wide expansion.",
  "facts": [
   "TfL: vehicles that do not meet ULEZ standards pay £12.50 a day; the zone runs 24 hours a day, every day except Christmas Day. It began in central London in 2019 and was expanded across all of London in 2023.",
   "Mayor of London (7 March 2025): 96.7% of vehicles seen in London were compliant, up from 91.6% in June 2023 and 39% in February 2017. In September 2024 there were nearly 100,000 fewer non-compliant vehicles a day than in June 2023 (-58%).",
   "Same report: modelled roadside NO2 in 2024 was 27% lower London-wide than without the ULEZ (54% central, 29% inner, 24% outer), and outer London exhaust PM2.5 was 31% lower. A scrappage scheme of around £200 million approved over 54,700 further applications before closing in September 2024.",
   "University of Birmingham study in npj Clean Air (October 2025): the first central zone (April 2019) cut roadside NO2 by 19.6% within three months, but the 2023 expansion had no significant detectable effect on NO2 or NOx, as only 7.4% of vehicles were non-compliant when it began."
  ],
  "diagram": "Negative consumption externality: MSB below MPB for driving polluting vehicles, so the market quantity (MPB = MPC) is above the optimum (MSB = MPC), with a welfare loss triangle. The £12.50 daily charge acts like a specific tax, shifting the private cost curve up towards the optimum quantity.",
  "evaluation": [
   "Measuring success: City Hall figures compare reality with a modelled 'no ULEZ' scenario, while the Birmingham study uses observed data and finds the 2023 expansion added little, because drivers had already switched in anticipation. Both can be partly right.",
   "Equity: a flat £12.50 is regressive, falling hardest on low-income drivers and small traders with older vans in outer London. The £200 million scrappage subsidy softens this but did not reach everyone.",
   "Revenue vs behaviour: as compliance nears 100% the charge raises less money, which shows it works by changing behaviour; the tax base shrinks over time.",
   "Limits: electric and newer cars still emit PM2.5 from brakes and tyres, and pollution remains above WHO guidelines, so road pricing by distance, public transport and cycling are needed alongside it."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "A clear charge on a negative consumption externality with official compliance data and an independent study to weigh against it. Weakness: the headline NO2 figures are modelled against a counterfactual by the body that runs the scheme.",
  "sources": [
   "https://tfl.gov.uk/modes/driving/ultra-low-emission-zone",
   "https://www.london.gov.uk/media-centre/mayors-press-releases/new-evidence-reveals-all-londoners-are-now-breathing-cleaner-air-following-first-year-expanded-ultra",
   "https://www.birmingham.ac.uk/news/2025/londons-ulez-cut-air-pollution-high-vehicle-compliance-left-little-room-for-post-expansion-gains"
  ],
  "mem": {
   "tag": "London's dirty-car charge",
   "story": "Older cars pollute London's air → £12.50 daily charge from 2019, London-wide from 2023 → compliance climbs from 39% to 96.7% → City Hall claims 27% less roadside NO2 → independent study finds the 2023 expansion added little",
   "numbers": [
    [
     "£12.50",
     "daily ULEZ charge for non-compliant vehicles"
    ],
    [
     "96.7%",
     "share of vehicles compliant, 2024"
    ],
    [
     "27%",
     "modelled cut in roadside NO2 across London, 2024"
    ]
   ],
   "use": "negative consumption externalities, indirect taxes and charges, regulation, equity of environmental policy, government intervention in transport",
   "but": "An independent study found no significant extra fall in NO2 from the 2023 expansion, because most drivers had already switched."
  }
 },
 {
  "id": "venice-mose-flood-barrier",
  "tk": "MOSE",
  "title": "Venice MOSE: a €6.2bn flood barrier said to avoid €2.6bn of damage",
  "cue": "Venice: the MOSE flood barrier",
  "region": "Venice, Italy",
  "years": "2001–2026",
  "subtopic": "2.9",
  "concepts": [
   "public good",
   "rivalry",
   "excludability",
   "free rider problem",
   "direct provision",
   "contracting out"
  ],
  "hook": "MOSE's 78 sea gates cost about €6.2 billion, against a 2001 estimate of €4.1 billion. Italy's transport ministry says the first 100 raisings, up to March 2025, avoided more than €2.6 billion of flood damage, and each raising costs roughly €211,000–272,000.",
  "facts": [
   "Pagella Politica (November 2022): the 2001 estimate was €4.1 billion and the cost reached €6.2 billion by May 2022 (+51%). Each raising cost €272,000 in 2020–21 and €211,000 in 2021–22, and the state funds maintenance of about €63 million a year.",
   "Transport ministry via ANSA (12 March 2025): the gates rose for the 100th time; over five years they avoided damage worth more than €2.6 billion, including a tide of nearly 195 cm on 22 November 2022.",
   "The November 2019 flood of 187 cm, before MOSE was working, caused about €250 million of damage to public buildings and businesses (Tio, November 2022).",
   "The project was built by the Consorzio Venezia Nuova, awarded without a public tender (challenged by the European Commission in 2001); a corruption and tax fraud inquiry led to 35 arrests and the consortium was placed under special administration in 2014.",
   "Decree of 11 March 2026: MOSE became state property run by the Lagoon Authority. It was raised 30 times in the first two months of 2026, and future maintenance is expected to cost at least €100 million a year."
  ],
  "diagram": "Use the rivalry/excludability 2x2 grid: flood protection is non-rival (protecting one more building costs nothing extra) and non-excludable (no one in the city can be shut out). A private market would supply none, a missing market, so output is zero against the social optimum where MSB = MSC; the state provides it and pays through taxes.",
  "evaluation": [
   "Why the state: no firm could charge each resident, shop or visitor for protection, so everyone would free ride and the barrier would never be built privately. Direct provision paid for by taxation solves this.",
   "Costs vs benefits: €2.6 billion of avoided damage in five years against €6.2 billion to build plus maintenance suggests it can pay back over its life, but the damage figure is the ministry's own estimate.",
   "Government failure: a 51% cost overrun, years of delay, a corruption scandal and a contract given without competition show the risks of contracting out badly.",
   "Long run: it is raised far more often than planned as seas rise, which raises running costs, disrupts the port and may harm the lagoon, so MOSE may not be enough on its own."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "A vivid public good example with build costs, damage avoided and a clear free rider argument, plus strong government failure points. Weakness: the benefit figure comes from the government that built it, and the latest cost totals are from 2022.",
  "sources": [
   "https://pagellapolitica.it/articoli/costo-mose-venezia",
   "https://www.ansa.it/english/news/2025/03/12/venices-mose-has-prevented-2.6-bn-in-damages-in-5-years_31d46dfb-8431-44d2-9129-0aade9df0a56.html",
   "https://www.tio.ch/dal-mondo/attualita/1625533/danni-mose-venezia-salva-citta",
   "https://campaignforalivingvenice.org/2026/03/15/mose-becomes-state-property-maintenance-funds-guaranteed/"
  ],
  "mem": {
   "tag": "Venice's sea gates",
   "story": "2019 flood causes about €250m of damage → MOSE's 78 gates start working in 2020 → €4.1bn plan ends up €6.2bn, with a corruption scandal → 100 raisings avoid €2.6bn of damage → raised 30 times in two months of 2026",
   "numbers": [
    [
     "€6.2 billion",
     "cost of MOSE by May 2022"
    ],
    [
     "€2.6 billion",
     "flood damage avoided in five years, ministry estimate"
    ],
    [
     "€211,000",
     "cost of one raising, 2021–22"
    ]
   ],
   "use": "public goods, free rider problem, direct provision, government failure, climate adaptation, cost-benefit of government spending",
   "but": "A 51% cost overrun and a corruption scandal show that direct provision can waste a lot of public money."
  }
 },
 {
  "id": "thames-tideway-super-sewer",
  "tk": "TIDE",
  "title": "London super sewer: £4.5bn to cut Thames sewage spills by 95%",
  "cue": "London: the Thames Tideway 'super sewer'",
  "region": "London, United Kingdom",
  "years": "2015–2026",
  "subtopic": "2.9 (also 2.8)",
  "concepts": [
   "public good",
   "free rider problem",
   "excludability",
   "public-private partnership (PPP)",
   "externality",
   "marginal social benefit (MSB)"
  ],
  "hook": "The 25 km Tideway tunnel cost about £4.5 billion (some reports say £5 billion), was fully connected in February 2025 and had captured over 20 million tonnes of storm sewage by mid-2026. Thames Water customers pay £20–25 a year for it, yet the NAO found about 60% of the benefits go to people outside Thames Water's area.",
  "facts": [
   "Tideway factsheet (September 2024): cost £4.5 billion, 25 km long, 1.6 million m3 of storage, designed to cut spills into the Thames by 95% and to last at least 120 years. London's 150-year-old sewers spilled tens of millions of tonnes of sewage into the river every year.",
   "Time Out (18 February 2025): the last of 21 valves was connected on 14 February 2025, completing a project reported to have cost £5 billion.",
   "Tideway annual report (11 June 2026): more than 20 million tonnes of storm sewage captured since the first connection in August 2024; bills stay within the original £20–£25 a year estimate (2014/15 prices).",
   "National Audit Office (2 March 2017): the tunnel is run and financed by a separate private company, Bazalgette, backed by a government support package if costs overrun by more than 30% or debt markets close; the reasonable worst case for taxpayers was £6.6 billion. About 60% of benefits go to households outside Thames Water's area, and benefits were estimated at 1.8 to 3.1 times costs. The UK had been found in breach of the EU urban waste water directive in 2012."
  ],
  "diagram": "Treat a clean river as a public good: non-rival and non-excludable, so no private firm would supply it (a missing market) and output is below the optimum where MSB = MSC. Alternatively, draw sewage spills as a negative production externality (MSC above MPC) and show the tunnel reducing the external cost. Explain the PPP: private investors finance and build, while bill-payers repay through regulated charges.",
  "evaluation": [
   "Free riders: rowers, anglers, tourists and people far from the river gain from a cleaner Thames without paying, and the NAO found 60% of benefits go outside the area whose bills fund it, so the payment does not match the benefit.",
   "PPP trade-offs: private finance moved the debt off the government's books and used private expertise, but taxpayers still carried the tail risk (£6.6 billion worst case) and private finance usually costs more than government borrowing.",
   "Effectiveness: over 20 million tonnes captured is a big gain, but the tunnel covers only London's worst overflows; sewage spills across England and heavier rain from climate change remain problems.",
   "Alternatives: the NAO said cheaper options, such as a smaller tunnel, were not fully explored, a possible government failure in choosing a costly solution."
  ],
  "rating": {
   "relevance": 4,
   "data": 4,
   "recency": 4,
   "evaluation": 5
  },
  "verdict": "The best recent example of a public-private partnership delivering a public good, with official audit evidence on who pays and who benefits. Weakness: a clean river is a debatable public good, and the NAO's financing analysis dates from 2017.",
  "sources": [
   "https://www.cprelondon.org.uk/wp-content/uploads/sites/10/2025/01/Tideway-Factsheet-Sep-2024.pdf",
   "https://www.timeout.com/london/news/londons-new-5-billion-super-sewer-is-now-fully-connected-021825",
   "https://tideway.london/news/press-releases/2026/june/tideway-publishes-annual-report-as-london-s-super-sewer-captures-over-20-million-tonnes-of-sewage/",
   "https://www.nao.org.uk/reports/review-of-the-thames-tideway-tunnel/"
  ],
  "mem": {
   "tag": "London's super sewer",
   "story": "Victorian sewers spill tens of millions of tonnes into the Thames → UK breaches EU rules → private company Bazalgette builds a £4.5bn tunnel with state backing → fully connected in February 2025 → over 20 million tonnes captured by mid-2026",
   "numbers": [
    [
     "£4.5 billion",
     "cost of the Tideway tunnel (Tideway figure)"
    ],
    [
     "20 million tonnes",
     "storm sewage captured, August 2024 to mid-2026"
    ],
    [
     "60%",
     "share of benefits going to people outside Thames Water's area (NAO)"
    ]
   ],
   "use": "public goods, free rider problem, public-private partnerships, negative production externalities, government provision of infrastructure",
   "but": "Only Thames Water customers pay, although the NAO found most of the benefits go to people outside its area."
  }
 },
 {
  "id": "uk-car-finance-commission-redress",
  "tk": "CARF",
  "title": "UK car finance: a £9.1bn bill for hidden commission",
  "cue": "UK car finance: hidden dealer commission",
  "region": "United Kingdom",
  "years": "2007–2026",
  "subtopic": "2.10",
  "concepts": [
   "asymmetric information",
   "information provision",
   "market failure",
   "consumer surplus",
   "command and control regulation",
   "government failure"
  ],
  "hook": "For years car buyers were not told that dealers and brokers earned commission from lenders, sometimes by pushing up the buyer's interest rate. The FCA's March 2026 redress scheme covers 12.1 million agreements and would cost firms £9.1bn, but it is partly suspended until a tribunal hearing in February 2027.",
  "facts": [
   "Under 'discretionary commission arrangements' the broker could effectively set the customer's interest rate, so a higher rate meant more commission for the broker. The FCA banned these arrangements from 28 January 2021 and estimated the ban would save customers £165m a year.",
   "1 August 2025: the UK Supreme Court largely overturned an earlier ruling against lenders, but upheld one customer's claim (the Johnson case) that his relationship with the lender was unfair under the Consumer Credit Act 1974 because the commission had not been properly disclosed.",
   "30 March 2026: the FCA confirmed a redress scheme for agreements made between 6 April 2007 and 1 November 2024. It covers 12.1 million agreements (down from 14.2 million at consultation), with about £7.5bn of redress assuming 75% take-up, an average of £829 per agreement, and a total cost to firms of £9.1bn including £1.6bn of running costs.",
   "2 April 2026: Lloyds Banking Group said its existing £1.95bn motor finance provision did not need to change. A record £41bn was lent on motor finance in 2025, 6% more than in 2024 (FCA).",
   "The scheme was legally challenged on 1 May 2026 and on 2 July 2026 the Upper Tribunal suspended parts of it on terms agreed with the four challengers. On 13 October 2026 the FCA said the challenges will be heard from 16 to 26 February 2027; until then firms do not have to calculate or pay compensation."
  ],
  "diagram": "Asymmetric information diagram for car finance: draw the demand curve buyers act on without full information (D1, based on what they think the loan costs) above the demand curve they would have with full information about the commission (D2 = MSB). Buyers take Q1 loans instead of Q*, at too high a cost, giving a welfare loss triangle between D1 and D2 from Q* to Q1. Show information provision or a ban on commission-linked rates moving demand back towards D2.",
  "evaluation": [
   "Stakeholders: about 12 million borrowers would gain an average £829, but lenders carry the cost (Lloyds alone has set aside £1.95bn) and may pass it on as dearer or scarcer credit for future borrowers, especially those with weaker credit records.",
   "Regulation lag (government failure): commission-linked rates ran from 2007 until the FCA ban in 2021, and payouts are now delayed until at least 2027 by legal challenges, so many affected buyers have waited well over a decade.",
   "Choice of policy: simply disclosing commission relies on buyers reading and understanding it (bounded rationality), so the FCA went further and banned the incentive itself, which is command and control regulation rather than information provision alone.",
   "Magnitude: record lending of £41bn in 2025 shows the market kept working, so the failure was about price and information rather than the market collapsing, and £829 per agreement is real but modest harm per household."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "The clearest recent European case of asymmetric information, with official FCA figures and a live policy fight to evaluate. Weakness: the final payout depends on the February 2027 hearing, so the numbers may still change.",
  "sources": [
   "https://www.fca.org.uk/news/statements/fca-confirms-motor-finance-redress-scheme",
   "https://www.fca.org.uk/news/press-releases/fca-ban-motor-finance-discretionary-commission-models",
   "https://finreg.aoshearman.com/UK-Supreme-Court-hands-down-significant-judgement",
   "https://www.ajbell.co.uk/news/articles/lloyds-sticks-ps2-billion-motor-finance-provision",
   "https://finreg.aoshearman.com/uk-fca-confirms-motor-finance-legal-challenge-to-be-heard-in-february-2027"
  ],
  "mem": {
   "tag": "Hidden car commission",
   "story": "Broker can set your interest rate → higher rate means more commission, and the buyer is not told → FCA bans the practice in 2021 → Supreme Court backs the Johnson claim in 2025 → £9.1bn redress scheme in 2026 → paused by legal challenges until 2027",
   "numbers": [
    [
     "12.1 million",
     "car finance agreements eligible for redress"
    ],
    [
     "£829",
     "average redress per agreement"
    ],
    [
     "£9.1bn",
     "total cost to firms, including running costs"
    ]
   ],
   "use": "asymmetric information, information provision and regulation, consumer protection, government failure in regulation, evaluating responses to market failure",
   "but": "Record lending of £41bn in 2025 shows the market kept working, and the average harm of £829 per agreement is modest for each household."
  }
 },
 {
  "id": "south-korea-jeonse-deposit-fraud",
  "tk": "JNSE",
  "title": "South Korea: 41,559 tenants hit by rental deposit fraud",
  "cue": "South Korea: jeonse rental deposit fraud",
  "region": "South Korea",
  "years": "2022–2026",
  "subtopic": "2.10",
  "concepts": [
   "asymmetric information",
   "moral hazard",
   "screening",
   "information provision",
   "market failure",
   "government failure"
  ],
  "hook": "Under jeonse, tenants hand the landlord a large refundable deposit instead of paying rent, without knowing the landlord's debts or the home's true value. By September 2026, 41,559 tenants had been officially recognised as fraud victims, and the state guarantor HUG paid out a record 3.99 trillion won in 2024.",
  "facts": [
   "Jeonse tenants usually pay a deposit of 60–80% of the home's value on a two-year contract and live rent-free, while the landlord can use the cash. For cheap new-build 'villas' the deposit was close to, or even above, the purchase price, so so-called 'villa kings' bought many homes with almost none of their own money. One, who died in October 2022, had bought over 1,000 homes; the scheme only worked while prices kept rising.",
   "By the end of September 2026, 41,559 tenants had been recognised as victims under a special act in force since June 2023 (58.5% of the 71,058 cases handled). 75.9% were in their 20s or 30s, 97.7% had deposits of 300 million won (about $224,000) or less, and 60.7% of cases were in greater Seoul.",
   "Payouts by the state Korea Housing and Urban Guarantee Corporation (HUG) under its deposit-return guarantee reached a record 3.99 trillion won in 2024 (18,553 cases), then fell 55.1% to 1.79 trillion won in 2025, the first annual fall since payouts began in 2015. In May 2023 HUG had tightened its guarantee rule from 100% to 90% of the home's value.",
   "Support by September 2026: the state housing corporation LH had bought 11,148 affected homes, the government had provided 80,188 forms of help with housing, finance and legal costs, and the ministry and HUG run a safe-contract service so tenants can check ownership and contract risks before signing."
  ],
  "diagram": "Asymmetric information diagram for risky jeonse rentals: demand with imperfect information (D1, tenants believe the deposit is safe) lies above demand with full information (D2 = MSB, tenants know the landlord's debts and the home's true value). Too many risky contracts are signed (Q1 rather than Q*), giving a welfare loss triangle. Show screening rules and information provision moving the market back towards Q*.",
  "evaluation": [
   "Two information failures at once: tenants could not see landlords' debts or true home values (asymmetric information), and a 100% state guarantee made tenants less careful and let landlords set deposits at the full value of the home (moral hazard). Cutting the limit to 90% in 2023 is a screening response.",
   "Equity: the losers are mostly young renters in cheaper homes (75.9% in their 20s or 30s, nearly all with deposits under 300 million won), who often lose most of their savings, while the cost of guarantees and buy-backs falls on the state.",
   "Short run vs long run: payouts fell 55.1% in 2025, which suggests tighter rules are working, but recognition is not automatic, as only 58.5% of cases handled have been accepted, so many tenants still lose out.",
   "Limits of information provision: safe-contract checks help only tenants who use them and understand the risks, and tighter rules make honest jeonse harder to arrange, pushing renters towards monthly rent."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "An unusual Asian case that shows asymmetric information and moral hazard together, with official victim counts and guarantee data. Weakness: jeonse exists almost only in Korea, so you must explain the system before the economics.",
  "sources": [
   "https://www.koreajoongangdaily.com/korea/jeonse-fraud-victims-top-41500-as-623-more-recognized-in-september/12914425",
   "https://www.khan.co.kr/en/article/202601170938287",
   "https://www.koreajoongangdaily.com/business/1000s-of-jeonse-deposits-not-returned-as-villa-kings-default/10260461",
   "https://koreapro.org/2023/05/how-sophisticated-scams-are-jeopardizing-south-koreas-unique-housing-system"
  ],
  "mem": {
   "tag": "Korea's vanishing deposits",
   "story": "Tenant hands landlord a huge deposit → cannot see the landlord's debts or the home's true value → 'villa kings' buy homes with tenants' money → prices fall and deposits are not returned → state guarantor HUG pays record sums → guarantee rules tightened and victims supported",
   "numbers": [
    [
     "41,559",
     "recognised jeonse fraud victims, end of September 2026"
    ],
    [
     "75.9%",
     "share of victims in their 20s or 30s"
    ],
    [
     "3.99 trillion won",
     "HUG guarantee payouts in 2024, a record"
    ]
   ],
   "use": "asymmetric information, moral hazard, screening and information provision, housing markets, government responses to market failure",
   "but": "HUG payouts fell 55.1% in 2025, which suggests tighter screening is already shrinking the problem without heavier regulation."
  }
 },
 {
  "id": "eu-dma-google-fine",
  "tk": "GDMA",
  "title": "EU fines Google €890m under the Digital Markets Act",
  "cue": "EU Digital Markets Act: fines on Google, Apple and Meta",
  "region": "European Union",
  "years": "2023–2026",
  "subtopic": "2.11",
  "concepts": [
   "market power",
   "monopoly",
   "barriers to entry",
   "abnormal (economic) profit",
   "allocative efficiency",
   "economies of scale",
   "competition policy"
  ],
  "hook": "On 23 July 2026 the European Commission fined Google €890m under the Digital Markets Act: €460m for favouring its own services in Search and €430m for stopping app developers steering users to cheaper offers. This followed €500m for Apple and €200m for Meta in April 2025; fines can reach 10% of world turnover.",
  "facts": [
   "The Digital Markets Act sets rules in advance for very large 'gatekeeper' platforms. Fines can reach 10% of total worldwide annual turnover (20% for repeated breaches), and periodic penalties up to 5% of average daily turnover. Google was designated a gatekeeper for Search in September 2023.",
   "23 April 2025: in the first DMA non-compliance decisions, the Commission fined Apple €500m for anti-steering rules in its App Store and Meta €200m for its 'pay or consent' advertising model.",
   "23 July 2026: the Commission fined Google €460m for ranking its own shopping, hotel, transport and sports results above rivals in Search, and €430m because its Google Play steering fees and charging period went beyond what the DMA allows. Investigations opened on 25 March 2024; Google has 60 days to comply and may appeal.",
   "Alphabet, Google's parent, had revenue of $403bn in 2025 and net income of $34.5bn in the fourth quarter of 2025 alone. At roughly $1bn, the €890m fine is about 0.25% of a year's revenue (own calculation)."
  ],
  "diagram": "Monopoly diagram: the gatekeeper produces where MR = MC, charges a price above MC and earns abnormal profit, with a deadweight welfare loss compared with the allocatively efficient output where P = MC. Explain that the DMA aims to lower barriers to entry (for rival search services and app stores), pushing the market towards a more competitive price and output.",
  "evaluation": [
   "Magnitude: €890m is about 0.25% of Alphabet's yearly revenue and less than three days of its Q4 2025 profit, so the real pressure comes from the order to change behaviour within 60 days and the threat of daily penalties, not the fine itself.",
   "Rules in advance vs case by case: the DMA was meant to be faster than traditional competition cases, yet the Google investigation still took 28 months (March 2024 to July 2026), during which rivals kept losing traffic.",
   "Economies of scale and network effects: search engines and app stores get better and cheaper the bigger they are, so breaking them up could lose efficiency. Regulating conduct keeps the scale benefits while sharing more of the gains with rivals and consumers.",
   "Risk of government failure: rules written for whole sectors may be too rigid, and firms may delay new features in the EU; the Commission noted that Google is already testing changes, which suggests the threat of fines can work."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "Fresh, official and clearly about monopoly power and competition policy, with fines easy to compare with turnover. Weakness: the firms are American (the regulator is European) and Google may appeal, so the outcome is not final.",
  "sources": [
   "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1670",
   "https://digital-markets-act.ec.europa.eu/commission-fines-google-eur890-million-breaches-digital-markets-act-2026-07-23_en",
   "https://digital-markets-act.ec.europa.eu/commission-finds-apple-and-meta-breach-digital-markets-act-2025-04-23_en",
   "https://digital-markets-act.ec.europa.eu/about-dma_en",
   "https://abc.xyz/investor/events/event-details/2026/2025-Q4-Earnings-Call-2026-Dr_C033hS6/default.aspx"
  ],
  "mem": {
   "tag": "Gatekeepers pay up",
   "story": "A few platforms control search and app stores → EU names them gatekeepers in 2023 → Apple fined €500m and Meta €200m in 2025 → Google fined €890m in 2026 → 60 days to comply or face daily penalties",
   "numbers": [
    [
     "€890m",
     "DMA fines on Google, 23 July 2026"
    ],
    [
     "10%",
     "maximum DMA fine as a share of worldwide turnover"
    ],
    [
     "$403bn",
     "Alphabet's revenue in 2025"
    ]
   ],
   "use": "monopoly power, barriers to entry, competition policy and regulation, abnormal profit, evaluating fines, digital markets",
   "but": "At about 0.25% of Alphabet's yearly revenue, the fine alone barely dents its abnormal profit."
  }
 },
 {
  "id": "austria-construction-cartel",
  "tk": "BAUK",
  "title": "Austria's construction cartel: nearly €300m in fines",
  "cue": "Austria: the construction bid-rigging cartel",
  "region": "Austria",
  "years": "2002–2026",
  "subtopic": "2.11",
  "concepts": [
   "collusion",
   "oligopoly",
   "market power",
   "abnormal (economic) profit",
   "allocative efficiency",
   "competition policy"
  ],
  "hook": "More than 20 Austrian construction firms coordinated their bids on thousands of public and private projects from 2002 to 2017. Fines total nearly €300m, including a record €146m for Strabag in March 2026 after it lost its leniency status.",
  "facts": [
   "Over 2002–2017, more than 20 large and smaller construction firms coordinated bids on thousands of building and civil engineering projects across Austria, including road building, harming both public and private clients.",
   "The cartel came to light in 2016 when a binder of records was found at the Carinthian firm Kostmann, which then became a leniency applicant ('crown witness'). Fines included Porr €62.4m, Swietelsky €27.2m and Habau €26.3m.",
   "11 March 2026: the Vienna Cartel Court removed Strabag's leniency status and raised its fine from €45.4m to €146m, the highest cartel fine in Austrian history, after Strabag's lawyers accepted that it had not reported signs of collusion on three projects. Strabag accepted the higher fine.",
   "With the Strabag case all construction cartel proceedings ended. The head of the Federal Competition Authority (BWB), Natalie Harsdorf, said fines totalled nearly €300m and called it the largest cartel in the history of Austria's Second Republic."
  ],
  "diagram": "Collusive oligopoly: the firms act like a single monopolist, producing where industry MR = MC and charging a price above the competitive level, earning abnormal profit with a welfare loss. Add a two-firm payoff matrix (game theory) to show why each firm is tempted to cheat on the agreement, and how a leniency programme rewards the first firm to confess.",
  "evaluation": [
   "Who loses: public bodies paid inflated prices for roads and buildings, so taxpayers bore much of the cost and the opportunity cost of public spending rose (fewer projects for the same budget).",
   "Detection: the cartel ran for 15 years before a single binder exposed it, which shows how hard collusion is to spot. Leniency works like a prisoner's dilemma, and Strabag losing its status shows leniency must depend on full cooperation.",
   "Deterrence: there is no official estimate of how much prices were inflated, so we cannot tell whether nearly €300m across more than 20 firms and 15 years exceeded the extra profit they made.",
   "Market structure: repeated local tenders with few bidders make collusion easier to sustain, so alternatives include more bidders per tender, procurement checks for suspicious bid patterns and banning convicted firms from tenders."
  ],
  "rating": {
   "relevance": 5,
   "data": 4,
   "recency": 5,
   "evaluation": 4
  },
  "verdict": "A clear, non-US textbook case of collusion and leniency with a fresh 2026 record fine. Weakness: there is no official figure for how much prices were inflated, so the size of the welfare loss is unknown.",
  "sources": [
   "https://orf.at/stories/3423532/",
   "https://orf.at/stories/3423535/",
   "https://www.trend.at/unternehmen/strabag-kartellstrafe-auf-146-millionen-euro-erhoeht"
  ],
  "mem": {
   "tag": "Austrian bid-rigging",
   "story": "Builders agree who wins each tender → thousands of projects overpriced for 15 years → binder found at Kostmann in 2016 → leniency deals and fines for more than 20 firms → Strabag loses leniency and pays a record €146m in 2026",
   "numbers": [
    [
     "€146m",
     "Strabag's fine, March 2026, an Austrian record"
    ],
    [
     "nearly €300m",
     "total fines in the construction cartel"
    ],
    [
     "15 years",
     "how long the cartel ran, 2002 to 2017"
    ]
   ],
   "use": "collusion and cartels, oligopoly behaviour, game theory and leniency, competition policy, public procurement",
   "but": "Without an estimate of the overcharge, nearly €300m spread over more than 20 firms and 15 years may be smaller than the cartel's extra profit."
  }
 },
 {
  "id": "australia-supermarket-duopoly",
  "tk": "AUSM",
  "title": "Australia: Coles and Woolworths hold 67% of grocery sales",
  "cue": "Australia: the Coles and Woolworths supermarket duopoly",
  "region": "Australia",
  "years": "2024–2026",
  "subtopic": "2.11 (also 2.10)",
  "concepts": [
   "oligopoly",
   "market power",
   "barriers to entry",
   "abnormal (economic) profit",
   "economies of scale",
   "asymmetric information",
   "competition policy"
  ],
  "hook": "The ACCC found in March 2025 that Woolworths (38%) and Coles (29%) dominate an oligopoly with 'limited incentive to compete vigorously' on price. In May 2026 a court ruled that Coles' 'Down Down' discounts misled shoppers, yet Coles' supermarket earnings still rose 12.2% in 2025–26.",
  "facts": [
   "21 March 2025: the ACCC's final supermarkets inquiry report put Woolworths' share of supermarket grocery sales at 38% and Coles' at 29% (together 67%), with ALDI 9% and independents supplied by Metcash 7%. It described 'an oligopolistic market structure in which Coles and Woolworths have limited incentive to compete vigorously' on price.",
   "The ACCC found Coles and Woolworths are among the most profitable supermarket businesses compared with global peers, and that ALDI, Coles and Woolworths raised their product and EBIT margins over five years, though it did not find price gouging. It said the 'advantages of incumbency' mean significant entry by new full-service chains is unlikely, and made 20 recommendations, including publishing prices online and clearer unit pricing.",
   "14 May 2026: the Federal Court found Coles misled shoppers with 'illusory' Down Down discounts. The ACCC case covered 245 products between February 2022 and May 2023; for example, Strepsils lozenges sold at $5.50 for about two years, were raised to $7, then advertised as 'Down Down' at $6. The penalty will be set later, and a similar case against Woolworths continues.",
   "25 August 2026: Coles reported 2025–26 supermarket sales of $41.5bn (up 3.7%) and supermarket EBIT up 12.2%, with the EBIT margin rising 43 basis points to 5.7%. Group underlying net profit rose 13.7% to $1,255m."
  ],
  "diagram": "Kinked demand curve for oligopoly: if one chain cuts its price, rivals follow (demand below the kink is inelastic), but if it raises its price, rivals do not (demand above the kink is elastic), so prices are sticky and firms compete on promotions rather than price. Alternatively, a monopoly-style diagram showing price above MC and abnormal profit.",
  "evaluation": [
   "Are profits abnormal? A 5.7% EBIT margin looks thin, but supermarkets sell huge volumes on modest capital, and the ACCC's comparison with overseas peers found them among the most profitable, with margins rising over time.",
   "Economies of scale: national distribution networks and buying power lower costs, which is partly why the ACCC did not recommend breaking the chains up; a fragmented market might have higher costs and prices.",
   "Policy mix: the response relies mainly on transparency and consumer law (price publishing, unit pricing, the discounts case), which tackles asymmetric information but leaves market structure unchanged, so it may do little to lower prices.",
   "Stakeholders: suppliers also face the chains' power, since the ACCC found the chains sometimes accept supplier price rises only if their own percentage margin is kept or increased."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "An excellent oligopoly case with regulator findings, market shares, a court ruling and fresh profit data. Weakness: the thin 5.7% margin lets the chains argue they are not earning large abnormal profits.",
  "sources": [
   "https://www.choice.com.au/shopping/everyday-shopping/supermarkets/articles/accc-final-supermarkets-report",
   "https://www.foodnavigator.com/Article/2025/04/02/australia-supermarket-report-more-grocery-competition-needed-to-break-oligopoly-but-barriers-may-be-too-high/",
   "https://thedailyaus.com.au/latest/fed-court-finds-coles-misled-customers-with-fake-discounts-13-05-2026",
   "https://announcements.asx.com.au/asxpdf/20260825/pdf/0735cc17cb83rn.pdf"
  ],
  "mem": {
   "tag": "Down Down duopoly",
   "story": "Two chains hold two-thirds of grocery sales → ACCC finds little incentive to compete on price → margins rise and new entry is unlikely → court finds Coles' Down Down discounts illusory → supermarket profits still grow",
   "numbers": [
    [
     "67%",
     "combined share of Woolworths (38%) and Coles (29%)"
    ],
    [
     "245",
     "Coles products in the ACCC's misleading discounts case"
    ],
    [
     "12.2%",
     "rise in Coles supermarket EBIT, 2025–26"
    ]
   ],
   "use": "oligopoly, market power and barriers to entry, abnormal profit, competition policy, misleading pricing and asymmetric information",
   "but": "Coles' supermarket EBIT margin is only 5.7%, and economies of scale may keep costs lower than a more fragmented market would."
  }
 },
 {
  "id": "france-wealth-concentration-zucman-tax",
  "tk": "ZTAX",
  "title": "France: the top 10% own 47.9% of wealth, and a 2% tax is rejected again",
  "cue": "France: wealth concentration and the Zucman tax",
  "region": "France",
  "years": "2016–2026",
  "subtopic": "2.12",
  "concepts": [
   "equity",
   "equality",
   "wealth",
   "income",
   "progressive tax",
   "market failure"
  ],
  "hook": "In 2024 the richest 10% of French households held 47.9% of gross wealth and the poorer half about 7%, while the richest 0.0002% paid an effective tax rate of 26%, against 46% for the top 0.1%. A 2% minimum tax on fortunes above €100m was rejected in October 2025 (228 to 172) and again on 16 October 2026 (70 to 35).",
  "facts": [
   "INSEE (table updated 7 April 2026): the top 10% of households held 47.9% of gross wealth in 2024 (47.8% in 2015) and the top 1% held 15.4%; the bottom 50% held about 7.2% (calculated from INSEE's figures). In 2021 a household needed at least €716,300 of gross wealth to be in the top 10%.",
   "The 500 largest professional fortunes (Challenges magazine ranking) were worth €1,128bn in 2025, about 6.6 times the roughly €170bn of two decades earlier, a rise of 564% while consumer prices rose 38% (Observatoire des inégalités).",
   "Institut des politiques publiques (June 2023, 2016 tax data): the effective tax rate rises to 46% for the top 0.1% of households but falls to 26% for the richest 0.0002%, because their income is mainly company profits, which are taxed at a lower rate than personal income.",
   "Economist Gabriel Zucman proposed a 2% minimum tax on wealth above €100m, affecting about 1,800 households and raising around €20bn a year by his estimate. The National Assembly rejected it on 31 October 2025 by 228 votes to 172; Prime Minister Sébastien Lecornu said there was no 'miracle tax'.",
   "16 October 2026: during the first reading of the 2027 budget, an amendment for the same 2% minimum tax on net wealth above €100m was rejected by 70 votes to 35."
  ],
  "diagram": "Lorenz curve for wealth: draw the line of equality and a wealth Lorenz curve that bows far below it (the poorer half owns about 7% of wealth), next to a less unequal income Lorenz curve. Show that a well-designed progressive or minimum wealth tax would move the after-tax curve towards the line of equality and lower the Gini coefficient.",
  "evaluation": [
   "Why the market fails on equity: returns on shares and property go to people who already own them, and wealth can be inherited, so market rewards follow ownership rather than effort or need and wealth inequality is far greater than income inequality.",
   "Tax design: income tax is progressive up to the top 0.1% but becomes regressive above that, because the very rich hold wealth in companies and pay little personal income tax. A minimum wealth tax targets this gap directly.",
   "Behaviour and magnitude: the €20bn estimate comes from the tax's designer; wealth in unlisted family firms is hard to value and may be moved abroad, so actual revenue could be much lower.",
   "Equity vs efficiency: supporters see fairness and revenue for public services in a country with a large deficit, while opponents argue a yearly levy on business assets could force share sales and reduce investment, which is why MPs keep rejecting it."
  ],
  "rating": {
   "relevance": 5,
   "data": 5,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A strong equity case with official INSEE wealth shares, a finding that tax becomes regressive at the very top, and a live progressive-tax debate. Weakness: the €20bn revenue estimate comes from the tax's own designer and may ignore avoidance.",
  "sources": [
   "https://www.insee.fr/fr/statistiques/2502915",
   "https://www.ipp.eu/en/publication/what-taxes-do-billionaires-pay/",
   "https://inegalites.fr/La-croissance-demesuree-des-500-plus-grandes-fortunes",
   "https://www.thelocal.fr/20251101/french-lawmakers-reject-wealth-tax-as-budget-tensions-mount",
   "https://datan.fr/votes/legislature-17/vote_8859"
  ],
  "mem": {
   "tag": "Zucman's 2% floor",
   "story": "Returns on capital go to those who already own it → top 10% hold nearly half of all wealth → effective tax rate falls to 26% at the very top → Zucman proposes a 2% minimum on fortunes above €100m → MPs reject it in 2025 and again in 2026",
   "numbers": [
    [
     "47.9%",
     "share of gross wealth held by the top 10%, 2024"
    ],
    [
     "26%",
     "effective tax rate of the richest 0.0002% (2016 data)"
    ],
    [
     "€100m",
     "wealth threshold for the proposed 2% minimum tax"
    ]
   ],
   "use": "market failure to achieve equity, wealth vs income inequality, progressive and regressive taxation, equity vs efficiency, policies to reduce inequality",
   "but": "Wealth held in family firms is hard to value and easy to move, so a 2% yearly levy could raise far less than €20bn and discourage investment."
  }
 },
 {
  "id": "indonesia-free-nutritious-meals",
  "tk": "MBGI",
  "title": "Indonesia's free meals: 57 million fed, budget cut to 229tn rupiah",
  "cue": "Indonesia: the free nutritious meals programme",
  "region": "Indonesia",
  "years": "2025–2026",
  "subtopic": "2.12 (also 2.8)",
  "concepts": [
   "equity",
   "income",
   "merit good",
   "direct provision",
   "opportunity cost",
   "government failure"
  ],
  "hook": "Indonesia's free meals programme had reached 57 million people by September 2026, aimed at poor nutrition: 19.8% of young children were stunted in 2024. But the 2026 budget was cut from 335tn to a provisional 229tn rupiah, and a lawmaker says about 50,000 people have been hit by food poisoning.",
  "facts": [
   "Ministry of Health survey (published 27 May 2025): 19.8% of young children were stunted in 2024, down from 21.5% in 2023. Children in poorer households are the least able to buy nutritious food through the market.",
   "By September 2025 the programme had 22.7 million beneficiaries against a year-end target of 82.9 million, from a 2025 budget of 71 trillion rupiah (Gadjah Mada University economists).",
   "21 July 2026 (Reuters): the 2026 allocation was cut from an original 335 trillion rupiah to 268 trillion and then to a provisional 229 trillion rupiah ($12.81bn). The target had been 83 million people, about 30% of the population, mainly students and pregnant women; 62.5 million had been reached before the review. A month earlier the agency's former chief was arrested over corruption allegations.",
   "3 September 2026 (Reuters): more than 1,700 people fell ill in suspected food poisoning in three days; a lawmaker citing health ministry data said about 50,000 had been affected by 1 September. A July survey found only a third of people satisfied with the programme.",
   "9 October 2026: 57 million beneficiaries and 153.2 trillion rupiah spent by the end of September 2026, through 27,486 kitchens; 1,276 kitchens had been shut for lacking a hygiene certificate."
  ],
  "diagram": "Merit good diagram: MSB lies above MPB (demand) because good nutrition brings external benefits (healthier, more productive workers) and poor families cannot afford enough. The market gives Q1 below the social optimum Q*, with a welfare loss. Free direct provision (price zero) raises consumption towards or beyond Q*. Link to equity: without provision, access depends on ability to pay.",
  "evaluation": [
   "Universal or targeted: Gadjah Mada University economists argue a universal design 'risks being both inefficient and regressive', since fewer than 3% of children face severe food insecurity (6–7% in poorer households); targeting poor families would cost far less.",
   "Opportunity cost: 229 trillion rupiah a year could instead fund schools, clinics or cash support; the same economists say the programme's fiscal weight is five to six times that of the main school-aid scheme.",
   "Government failure: rapid expansion outran hygiene checks (1,276 kitchens shut), mass poisonings damaged trust and a corruption case hit the agency, so direct provision has its own costs.",
   "Short run vs long run: poisoning and fiscal costs are immediate, while the gains in health, schooling and productivity take years to appear and are hard to measure, which makes cuts politically tempting."
  ],
  "rating": {
   "relevance": 4,
   "data": 4,
   "recency": 5,
   "evaluation": 5
  },
  "verdict": "A huge, current example of a government providing a merit good free to improve equity, with plenty of government failure to evaluate. Weakness: the figures change fast and the poisoning total comes from a lawmaker rather than an official release.",
  "sources": [
   "https://www.badankebijakan.kemkes.go.id/en/ssgi-2024-prevalensi-stunting-nasional-turun-menjadi-198/",
   "https://feb.ugm.ac.id/en/faculty-insight/17244-feeding-ambition-missing-precision-rethinking-indonesias-free-meal-program",
   "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/21/indonesia-cuts-budget-of-president039s-free-meals-programme-further-to-us128bil",
   "https://www.thestar.com.my/news/world/2026/09/03/latest-indonesian-free-meal-poisoning-outbreaks-affect-800-lawmaker-says",
   "https://www.metrotvnews.com/read/KXyCmV8G-indonesia-s-free-nutritious-meals-program-reaches-57-million-beneficiaries"
  ],
  "mem": {
   "tag": "Free lunch, real cost",
   "story": "Poorer families cannot afford enough nutritious food → about one in five young children stunted → state gives free meals to tens of millions → kitchens expand faster than hygiene checks → poisoning outbreaks and budget cuts",
   "numbers": [
    [
     "57 million",
     "free meal beneficiaries, end of September 2026"
    ],
    [
     "19.8%",
     "stunting rate among young children, 2024"
    ],
    [
     "229 trillion rupiah",
     "provisional 2026 budget after cuts (about $12.8bn)"
    ]
   ],
   "use": "market failure to deliver equity, merit goods and direct provision, government failure, opportunity cost, universal vs targeted policy",
   "but": "Gadjah Mada University economists call a universal scheme 'inefficient and regressive', since fewer than 3% of children face severe food insecurity."
  }
 }
];
