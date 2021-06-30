# feedbackapi
_code for feedback api_

#### Technologies
- python>=3.9.5,<3.10
- django>=3.2.4,<3.3.0
- djangorestframework>=3.12.4,<3.13.0
- mysql (https://dev.mysql.com/downloads/installer/)

run this in your cmd or alternatively download from website

```sh
pip install "django>=3.2.4,<3.3.0"
```
```sh
pip install "djangorestframework>=3.12.4,<3.13.0"
```

### Setup your mysql
- create a new database with [dbname]
- update in your _feedbackapi/settings.py_

![](/images/settings.py.png)

## APIS with urls(ss from postman)
![](/images/get_all(sorted_datetime).png)
![](/images/get_all(tag_true).png)
![](/images/get_byID.png)
![](/images/get_feed_freetextsearch.png)
![](/images/post_a_feed(email_non_null).png)
![](/images/put_byID.png)
