// script.js

angular.module('budgetApp', [])
    .controller('BudgetController', function($scope) {
        $scope.tableEntries = [
            { type: 1, name: "income", amount: 25000 },
            { type: 0, name: "rent", amount: 18000 },
            { type: 0, name: "food", amount: 5000 },
        ];

        $scope.updateSummary = function() {
            $scope.totalIncome = $scope.tableEntries.reduce(function(total, entry) {
                if (entry.type === 1) total += entry.amount;
                return total;
            }, 0);
            $scope.totalExpenses = $scope.tableEntries.reduce(function(total, entry) {
                if (entry.type === 0) total += entry.amount;
                return total;
            }, 0);
            $scope.balance = $scope.totalIncome - $scope.totalExpenses;
        };

        $scope.addItem = function() {
            if (!$scope.name || !$scope.amount || $scope.amount <= 0) {
                alert("Incorrect Input");
                return;
            }

            $scope.tableEntries.push({
                type: parseInt($scope.itemType),
                name: $scope.name,
                amount: parseInt($scope.amount)
            });

            $scope.name = "";
            $scope.amount = 0;

            $scope.updateSummary();
        };

        $scope.del = function(entry) {
            var index = $scope.tableEntries.indexOf(entry);
            $scope.tableEntries.splice(index, 1);
            $scope.updateSummary();
        };

        $scope.updateSummary();
    });
