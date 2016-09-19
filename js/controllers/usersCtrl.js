angular.module("listaUsuarios").controller("usersCtrl", function ($scope, $http) {
	$scope.app = "Lista de Usuários";

    $http.get("../users.json").then(function(response) {
        $scope.usuarios = response.data;
    });

    $scope.calculateAge = function (birthday) { // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    $scope.verificaAniversario = function (dtNascimento, index){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        today = dd+'/'+mm;

        //--------------------------------
        var d = new Date(dtNascimento).getDate();
        var m = new Date(dtNascimento).getMonth()+1;
        var nascimento = d+'/'+m;

        if(today == nascimento){
            document.getElementById('tab').rows[index].style.backgroundColor='yellow';
        }
    };

    $scope.verificaIdade = function (idade, index){
        if(idade < 18){
            document.getElementById('tab').rows[index].style.backgroundColor='blue';
            document.getElementById('tab').rows[index].style.color='white';
        }
        if(idade > 60){
            document.getElementById('tab').rows[index].style.backgroundColor='red';
            document.getElementById('tab').rows[index].style.color='white';
        }
    };
    
    $scope.ageFilter = function(usuario) {

        var idade = $scope.calculateAge(usuario.birthday);
        var minValue=0;
        var maxValue=100;

        var flMenor18 = $('#rdMenor18').prop('checked');
        var flMaior18 = $('#rdMaior18').prop('checked');
        var flMenor60 = $('#rdMenor60').prop('checked');
        var flMaior60 = $('#rdMaior60').prop('checked');
        var flTodos = $('#rdTodos').prop('checked')

        if(flMenor18) {
            minValue = Number.MIN_VALUE;
            maxValue = 18;
        } else if (flMaior18) {
            minValue = 18; 
            maxValue = Number.MAX_VALUE;
        } else if (flMenor60) {
            minValue = Number.MIN_VALUE;
            maxValue = 60;
        } else if (flMaior60) {
            minValue = 60;
            maxValue = Number.MAX_VALUE;
        } else if (flTodos) {
            minValue = Number.MIN_VALUE;
            maxValue = Number.MAX_VALUE;
        }
        return (idade > minValue && idade < maxValue);
    };

});