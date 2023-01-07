﻿
Функция Основнойpost(Запрос)
	
	ТипЗапроса = Запрос.ПараметрыЗапроса.Получить("typerequest"); 
	Если  ТипЗапроса = "" Тогда
		ВызватьИсключение "Не определен тип запроса"; 
	КонецЕсли;                       
	
	ДанныеЗапроса = Новый Структура;
	
	
	УстановитьПривилегированныйРежим(Истина);
	Ответ = Новый HTTPСервисОтвет(200);
	Ответ.Заголовки.Вставить("Content-Type","application/json");	
	Попытка    
		Если ТипЗапроса <> "uploadPhoto" Тогда 
			ДанныеЗапроса = lvlapp_МобильныйКабинетВрачаОбменСервер.ПрочитатьДанныеJson(Запрос);
		КонецЕсли;
		
	Исключение 
	КонецПопытки;
	ПараметрыСеанса.ТекущийПользователь = Справочники.Пользователи.НайтиПоНаименованию("Администратор");
	
	Если ТипЗапроса = "testconnection" Тогда
		ДанныеОтвета = Новый Структура("ок", true);
	ИначеЕсли  ТипЗапроса = "login" Тогда		
		ДанныеОтвета = lvlapp_Авторизация.Логин(ДанныеЗапроса.login,  ДанныеЗапроса.password);	
	ИначеЕсли  ТипЗапроса = "mobilerefreshToken" Тогда		
		ДанныеОтвета = lvlapp_Авторизация.ПолучитьТокен(ДанныеЗапроса.refreshToken);			
		Если ЗначениеЗаполнено(ДанныеОтвета.error) Тогда
			Ответ = Новый HTTPСервисОтвет(401);
		КонецЕсли;
	ИначеЕсли  ТипЗапроса = "refreshToken" Тогда	
		CookieСтр = Запрос.Заголовки.Получить("cookie");
		Если CookieСтр<>Неопределено Тогда
			Cookie = ПолучитьCookie(CookieСтр);
		Иначе
			Cookie = Новый Соответствие();
		КонецЕсли;	
		ДанныеОтвета = lvlapp_Авторизация.ПолучитьТокен(Cookie.Получить("refreshToken"));			
		Если ЗначениеЗаполнено(ДанныеОтвета.error) Тогда
			Ответ = Новый HTTPСервисОтвет(401);
		КонецЕсли;
	ИначеЕсли  ТипЗапроса = "getConformationCode" Тогда
		ДанныеОтвета = lvlapp_Авторизация.ПолучитьКодПодтверждения(ДанныеЗапроса.userID);
	ИначеЕсли  ТипЗапроса = "getKeyChangePassword" Тогда
		ДанныеОтвета =  lvlapp_Авторизация.ПолучитьКлючСменыПароляПоКодуПодтверждения(ДанныеЗапроса.userID, ДанныеЗапроса.requestKey, ДанныеЗапроса.code);
	ИначеЕсли  ТипЗапроса = "passwordChange" Тогда
		ДанныеОтвета = lvlapp_Авторизация.УстановитьПароль(ДанныеЗапроса.passwordСhangeKey,  ДанныеЗапроса.password);
	Иначе                 
		
		СтруктураПользователя = ПолучитьПользователя(Запрос);
		Если  ЗначениеЗаполнено(СтруктураПользователя.error) Тогда
			Ответ = Новый HTTPСервисОтвет(401);
			ДанныеОтвета = Новый Структура("error",СтруктураПользователя.error);
		Иначе			                                           
			Пользователь = сфпОбщегоНазначения.сфпЗначениеРеквизитаОбъекта(СтруктураПользователя.user, "Пользователь");
			ПараметрыСеанса.ТекущийПользователь = Пользователь;
			Если ТипЗапроса = "getDoctorsSchedule" Тогда //
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьРасписаниеВрача(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "getAllServicesForPatient" Тогда //
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьВсеУслугиПоПациенту(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "getHTML" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьHTML(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "getArrayPreviewPhoto" Тогда 
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьПревьюФото(ДанныеЗапроса);  
			ИначеЕсли ТипЗапроса = "uploadPhoto" Тогда 
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ЗагрузитьФото(Запрос);
			ИначеЕсли ТипЗапроса = "getDataService" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьДанныеПоУслуге(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "incExcPhotoInFavoriteGallery" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ВключитьИсключитьФотоГалереяДоПосле(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "saveComment" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.СохранитьКомментарий(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "getTagsByPhoto" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьТегиПоФото(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "addNewTagsByPhoto" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ДобавитьТегПоФото(ДанныеЗапроса);  
			ИначеЕсли ТипЗапроса = "deleteTagsByPhoto" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.УдалитьТегПоФото(ДанныеЗапроса);    
			ИначеЕсли ТипЗапроса = "deletePhoto" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.УдалитьФото(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "findPatient" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.НайтиПациента(ДанныеЗапроса);
			ИначеЕсли ТипЗапроса = "getDataMedicalDocument" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьДанныеМедицинскогоДокумента(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "getDataMedicalDocumentData" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьПоляМедицинскогоДокумента(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "saveValueParametr" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.СохранитьЗначениеПараметра(ДанныеЗапроса); 
			ИначеЕсли ТипЗапроса = "saveMedicalDocument" Тогда
				ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.СохранитьМедицинскийДокумент(ДанныеЗапроса); 
			
				
			Иначе
				ВызватьИсключение "Не определен тип запроса"; 
			КонецЕсли;     	
		КонецЕсли;  
	КонецЕсли; 
	
	Если ДанныеОтвета = Тип("HTTPСервисОтвет") Тогда
		
		Ответ = ДанныеОтвета;
		
	Иначе
		
		ДанныеJSON = lvlapp_МобильныйКабинетВрачаОбменСервер.ЗаписатьДанныеВJson(ДанныеОтвета);
		Ответ.Заголовки.Вставить("Content-Type","text/text; charset=UTF-8");
		Ответ.Заголовки.Вставить("Content-Type","application/json");
		Ответ.Заголовки.Вставить("Access-Control-Allow-Headers", "Authorization,Content-type, Accept");
		Ответ.Заголовки.Вставить("Access-Control-Allow-Methods", "POST");// и какие там еще есть методы у данного шаблона запроса
		
		refreshToken = "";
		//Если ДанныеОтвета.Свойство("refreshToken", refreshToken) Тогда
		//	Ответ.Заголовки.Вставить("Set-Cookie","refreshToken='" + refreshToken + "'; HttpOnly");
		//КонецЕсли;
		
		Ответ.УстановитьТелоИзСтроки(ДанныеJSON);
		
	КонецЕсли;
	
	Возврат Ответ;
	
КонецФункции   

Функция ОсновнойGET(Запрос)
	
	ТипЗапроса = Запрос.ПараметрыЗапроса.Получить("typerequest"); 
	Если  ТипЗапроса = "" Тогда
		ВызватьИсключение "Не определен тип запроса"; 
	КонецЕсли;  
	
	УстановитьПривилегированныйРежим(Истина);
	
	СтруктураПользователя = ПолучитьПользователя(Запрос);
	Если  ЗначениеЗаполнено(СтруктураПользователя.error) Тогда
		
		//ДанныеОтвета =  Новый HTTPСервисОтвет(401);  
		ДанныеОтвета = Новый HTTPСервисОтвет(500);
		
	Иначе			                                           
		Пользователь = сфпОбщегоНазначения.сфпЗначениеРеквизитаОбъекта(СтруктураПользователя.user, "Пользователь");
		ПараметрыСеанса.ТекущийПользователь = Пользователь;
		Если ТипЗапроса = "getPhoto" Тогда 
			ДанныеОтвета = lvlapp_МобильныйКабинетВрачаОбменСервер.ПолучитьФото(Запрос.ПараметрыЗапроса);
		Иначе
			ВызватьИсключение "Не определен тип запроса"; 
		КонецЕсли;     	
	КонецЕсли;	  
	
	Если ТипЗнч(ДанныеОтвета) = Тип("HTTPСервисОтвет") Тогда
		Ответ = ДанныеОтвета;
	Иначе
		Ответ = Новый HTTPСервисОтвет(200);
		ДанныеJSON = lvlapp_МобильныйКабинетВрачаОбменСервер.ЗаписатьДанныеВJson(ДанныеОтвета);   
		Ответ.УстановитьТелоИзСтроки(ДанныеJSON);
	КонецЕсли;
	Возврат Ответ;
	
КонецФункции

Функция ПолучитьПользователя(Запрос)

	accessToken = Запрос.ПараметрыЗапроса.Получить("token"); 
	Если Не ЗначениеЗаполнено(accessToken) Тогда
		accessToken = ПолучитьAccessToken(Запрос.Заголовки);
	КонецЕсли;
	СтруктураПользователя = lvlapp_Авторизация.ПолучитьПользоватеяПоКлючу(accessToken);
	Возврат СтруктураПользователя;
	
КонецФункции  

Функция ПолучитьAccessToken(Заголовки)
		
	accessToken = Заголовки.Получить("Authorization");
	Если Не ЗначениеЗаполнено(accessToken) Тогда 
		accessToken = Заголовки.Получить("authorization");
	КонецЕсли;
	
	accessToken = СтрЗаменить(СтрЗаменить(accessToken, "Bearer", ""), " ", "");
	Возврат accessToken;
	
КонецФункции

Функция ПолучитьCookie(стрCookies)
	
	Массив = СтрРазделить(стрCookies, ";",Истина);
	Результат  = Новый Соответствие();
	Для Каждого Элемент ИЗ Массив Цикл	
		КлючЗначение = StrSplit(Элемент, "=");
		Ключ = СокрЛП(КлючЗначение[0]);
		Значение = СтрЗаменить(СокрЛП(КлючЗначение[1]), "'", "");
		Результат.Вставить(Ключ, Значение);
	Конеццикла;
	Возврат Результат;
	
КонецФункции
