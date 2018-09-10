---
title: iOS调用系统发短信的两种方式
date: 2018-09-06 16:51:36
tags:
  - 教程
categories: 开发
---

#### 一、程序外部调用系统发短信 ####
> 这种方法其实很简单，直接调用openURL即可：

```
NSURL *url = [NSURL URLWithString:@"sms://13688888888"];
[[UIApplication sharedApplication]openURL:url];
```

#### 二、程序内部调用系统发短信 ####

> 这种方法有一个好处就是用户发短信之后还可以回到App
> 首先要导入MessageUI.framework，并引入头文件：

```
#import <MessageUI/MessageUI.h>
```

> 然后要遵循代理MFMessageComposeViewControllerDelegate，并实现代理方法

``` objc
#pragma mark - 代理方法
-(void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
{
    [self dismissViewControllerAnimated:YES completion:nil];
    switch (result) {
        case MessageComposeResultSent:
            //信息传送成功
             
            break;
        case MessageComposeResultFailed:
            //信息传送失败
             
            break;
        case MessageComposeResultCancelled:
            //信息被用户取消传送
             
            break;
        default:
            break;
    }
}

```


> 发送短信方法实现:

``` objc
#pragma mark - 发送短信方法
-(void)showMessageView:(NSArray *)phones title:(NSString *)title body:(NSString *)body
{
    if( [MFMessageComposeViewController canSendText] )
    {
        MFMessageComposeViewController * controller = [[MFMessageComposeViewController alloc] init];
        controller.recipients = phones;
        controller.navigationBar.tintColor = [UIColor redColor];
        controller.body = body;
        controller.messageComposeDelegate = self;
        [self presentViewController:controller animated:YES completion:nil];
        [[[[controller viewControllers] lastObject] navigationItem] setTitle:title];//修改短信界面标题
    }
    else
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示信息"
                                                        message:@"该设备不支持短信功能"
                                                       delegate:nil
                                              cancelButtonTitle:@"确定"
                                              otherButtonTitles:nil, nil];
        [alert show];
    }
}
```

> 最后，调用发送短信的方法:

``` objc
[self showMessageView:[NSArray arrayWithObjects:@"13688888888",@"13588888888", nil] title:@"test" body:@"这是测试用短信，勿回复！"];

```