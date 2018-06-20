<?php
class Objects
{
    public static function Check_added_obj($data){
        // проверка введенных пользователем данных об объекте
        if(!isset($data['cx']) || empty($data['cx']) )
            throw new \Exception("Некорректно введены координаты");
        if(!isset($data['cy']) || empty($data['cy']) )
            throw new \Exception("Некорректно введены координаты");
        if(!isset($data['name']) || empty($data['name']))
            throw new \Exception("Не указано имя");
        if(!isset($data['kind']) || empty($data['kind']))
            throw new \Exception("Не указан тип");
       // if(!isset($data['description']) || empty($data['description']))
        //    throw new \Exception("Нет описания");

    }
    public static function Add_obj($data, $id)
    {
        self::Check_added_obj($data);
        // Подключаемся к базе
        $db = Core::DB();
        // Проверка по координатам
        $res = $db -> where('cx', $data['cx']) -> where('cy', $data['cy']) -> get('object');
        if (!empty($res)) {
            throw new Exception('Объект с указанными координатами уже существует');
        }

        $obj_data = array(
            'cx' => $data['cx'],
            'cy' => $data['cy'],
            'kind' => $data['kind'],
            'date_add' => time(),
            'description' => $data['description'],
            'user_id' => $id,
            'name' => $data['name'],
        );
        // Помещам данные в базу
        $db->insert('object', $obj_data);
        $new_id = $db->getInsertId();
        if($new_id > 0)
            return $new_id;
        else
            throw new Exception('Непредвиденная ошибка при добавлении объекта');

    }
    public static function Get_obj ($cx, $cy){
        // Подключаемся к базе
        $db = Core::DB();
        if (isset($cx) && !empty($cx) && isset($cy) && !empty($cy)) {
            $res = $db
                ->where('cx', $cx)
                ->where('cy', $cy)
                ->get('object');
        }
        else
            throw new Exception('Не указаны или неправильно указаны координаты');
        return $db->getLastError();
    }
}