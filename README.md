
<div align="center">
  <img src="https://raw.githubusercontent.com/ZixuanGao23206703/BlackJack-Simulator/master/logo.jpg" alt="Logo" width="90" height="100">
</div>

<center>   

# Evaluating Blackjack Strategies Using Monte Carlo Simulation
</center>

![Python](https://img.shields.io/badge/python-v3.x-blue)
![Matplotlib](https://img.shields.io/badge/Matplotlib-3.4.3-yellow)
![NumPy](https://img.shields.io/badge/NumPy-latest-green)
![Plotly](https://img.shields.io/badge/Plotly-latest-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript)
![React.js](https://img.shields.io/badge/React.js-17.0.2-blue?logo=react)
![Axios](https://img.shields.io/badge/Axios-0.21.1-blueviolet?logo=axios)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0.0-purple?logo=bootstrap)
![CSS](https://img.shields.io/badge/CSS-3-blue?logo=css3)
![HTML](https://img.shields.io/badge/HTML-5-orange?logo=html5)
![License: MIT](https://img.shields.io/badge/License-MIT-blue)

Game can be found from [Blackjack Game-Zixuan](https://blackjack-simulator.onrender.com).

<div align="center">
  <img src="https://raw.githubusercontent.com/ZixuanGao23206703/BlackJack-Simulator/master/React-Blackjack-shortgif.gif" alt="Animation" width="500">
</div>

## :pushpin: Overview  
This project implements a Monte Carlo simulation of Blackjack to test and compare different playing strategies.The simulator models the game mechanics of Blackjack, including deck management, hand evaluation, and various player actions such as hitting, standing, doubling down, and splitting.

The goal is to evaluate the effectiveness of various strategies over many simulated games, providing insights into long-term performance and decision-making in specific scenarios. 

## :pencil:  Monte Carlo Simulation

The core of this project is the use of Monte Carlo simulation to evaluate Blackjack strategies. Monte Carlo methods rely on repeated random sampling to obtain numerical results. In the context:

- We simulate thousands of Blackjack hands for each strategy.
- Each hand is played out according to the strategy being tested.
- The results (wins, losses, pushes) are recorded.
- This process is repeated many times to build a statistical distribution of outcomes.

This approach allows us to:
1. Estimate the expected value of each strategy.
2. Understand the variance and risk associated with different playing styles.
3. Compare strategies based on long-term performance rather than short-term luck.

## :dart: Features  
- Monte Carlo simulation engine for robust strategy evaluation
- Multiple deck support
- Various Blackjack strategies implemented:
    - simplest_strategy: Hits if hand value is below 17; otherwise stands.
    - random_strategy: Randomly chooses to hit or stand.
    - basic_strategy: Classic strategy based on Blackjack strategy tables, considering both the player's hand and the dealer's visible card.
    - basic_strategy_no_split: A variation of the basic strategy that does not consider splitting pairs.
    - basic_strategy_no_aces: A variation of the basic strategy that ignores the special value of Aces.
    - basic_strategy_no_splits_or_aces: A variation of the basic strategy that ignores both splitting pairs and the special value of Aces.
- Detailed logging of game actions and outcomes
- Data visualization of simulation results using matplotlib and plotly
- Test functions for individual hand scenarios


## :key: Getting Started & Usage
Step 1: Clone or download the repo.  
```bash
 git clone https://github.com/ACM40960/project-ZixuanGao23206703.git
 ```
Step 2: Install the necessary Python packages with: 
```bash
pip install plotly
pip install Matplotlib
```
Step 3: Run Simulations: Simulate Blackjack games and analyze strategy performance.
```bash
python blackjack_simulate.py
```
Step 4: Testing Individual Strategies: Test a specific strategy on a single hand with step-by-step output.
```bash
from blackjack_test import test_strategy, test_strategy_with_specific_cards

# Test a general strategy
test_strategy(basic_strategy)

# Test a strategy with specific cards
test_strategy_with_specific_cards(basic_strategy, ('Ace', 'Hearts'), ('Eight', 'Spades'), ('King', 'Diamonds'))
```


## :eyes: Results
The simulation provides:

- Detailed logs of each hand played
- Mean profit and stake for each strategy
- Interactive histograms showing the distribution of profits
- HTML files of the plots saved in the "result_histogram" directory
    - simplest_strategy: [View Interactive Plot for Simplest Strategy](./result_histogram/simplest_strategy_plot.html) 
    - random_strategy: [View Interactive Plot for Random Strategy](./result_histogram/random_strategy_plot.html)
    - basic_strategy: [View Interactive Plot for Basic Strategy](./result_histogram/basic_strategy_plot.html)
    - basic strategy (No Split): [View Interactive Plot for Basic Strategy (No Split)](./result_histogram/basic_strategy_no_split_plot.html)
    - basic strategy (No Aces): [View Interactive Plot for Basic Strategy (No Aces)](./result_histogram/basic_strategy_no_aces_plot.html)
    - basic Strategy (No Splits or Aces): [View Interactive Plot for Basic Strategy (No Splits or Aces)](./result_histogram/basic_strategy_no_splits_or_aces_plot.html)

## :stars: Future Work
- Implementing additional strategies: Explore and compare more advanced strategies, including card counting methods.
- Simulating more complex scenarios: Incorporate additional game rules, such as different deck counts, surrender options, and varying dealer rules.
- Optimizing performance: Improve the efficiency of the simulation to handle even larger datasets and more complex strategy evaluations.
- Visualization improvements: Develop more detailed visualizations to better analyze the strategies' performance over time.

## :page_with_curl: License
This project is licensed under the MIT License - see the LICENSE file for details.


## :mailbox: Contact  
Email: zixuan.gao1@ucdconnect.ie  
LinkedIn: https://www.linkedin.com/in/zixuan-gia/   
GitHub: https://github.com/ZixuanGao23206703




