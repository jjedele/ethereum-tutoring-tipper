tippingContract.events.AmountIncreased({
    filter: {tutorGroupId: 5},
    fromBlock: 0
}, function(error, event) {
    alert(`You're now getting ${event.newTotal}ETH`);
});