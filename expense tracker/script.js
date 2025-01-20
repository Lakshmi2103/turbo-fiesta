angular.module("budgetApp", []).controller("BudgetController", function ($scope) {
    $scope.tableEntries = [
        { date: "2025-01-01", type: 1, name: "Salary", category: "Income", amount: 25000 },
        { date: "2025-01-02", type: 0, name: "Rent", category: "Rent", amount: 15000 },
        { date: "2025-01-03", type: 0, name: "Groceries", category: "Food", amount: 5000 },
    ];

    $scope.updateSummary = function () {
        $scope.totalIncome = $scope.tableEntries
            .filter((entry) => entry.type === 1)
            .reduce((total, entry) => total + entry.amount, 0);
        $scope.totalExpenses = $scope.tableEntries
            .filter((entry) => entry.type === 0)
            .reduce((total, entry) => total + entry.amount, 0);
        $scope.balance = $scope.totalIncome - $scope.totalExpenses;
    };

    $scope.addItem = function () {
        if (!$scope.name || !$scope.amount || $scope.amount <= 0) {
            alert("Invalid Input");
            return;
        }

        $scope.tableEntries.push({
            date: $scope.date || new Date().toISOString().split("T")[0],
            type: parseInt($scope.itemType),
            name: $scope.name,
            category: $scope.category,
            amount: parseInt($scope.amount),
        });

        $scope.name = "";
        $scope.amount = 0;
        $scope.date = "";
        $scope.category = "Others";

        $scope.updateSummary();
    };

    $scope.del = function (entry) {
        const index = $scope.tableEntries.indexOf(entry);
        $scope.tableEntries.splice(index, 1);
        $scope.updateSummary();
    };

    $scope.updateSummary();
});
