create database myworkspace;
use myworkspace;

create table Pessoas (
  id_login INT NOT NULL AUTO_INCREMENT,
  senha VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  usuario VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_login`));

create table Tarefas (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(45) NOT NULL,
  descricao VARCHAR(500) NOT NULL,
  links VARCHAR(500) NULL,
  dataT DATE NOT NULL,
  diario TINYINT NOT NULL,
  Pessoas_id_login INT NOT NULL,
  PRIMARY KEY (`id`, `Pessoas_id_login`),
  INDEX `fk_Pessoas_idx` (`Pessoas_id_login` ASC) VISIBLE,
  CONSTRAINT `fk_Pessoas`
    FOREIGN KEY (`Pessoas_id_login`)
    REFERENCES `Pessoas` (`id_login`));
    
    
    create user 'nodeApp'@'%' identified with mysql_native_password by 'Abcd&123';
    create user 'nodeApp'@'%' identified by 'Abcd&123';
    
    