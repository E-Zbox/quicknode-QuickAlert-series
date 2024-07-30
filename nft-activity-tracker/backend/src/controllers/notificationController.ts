import { NextFunction, Request, Response } from "express";
// utils
import { getNotification, updateNotification } from "@/utils/apis";
import { checkForObjectKeys } from "@/utils/config";
import { RequestBodyError } from "@/utils/errors/controllers";

export const getNotificationExpressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data, error, success } = await getNotification();

    if (!success) {
      throw error;
    }

    const { expression } = data;

    return res.status(200).json({ data: expression, error, success });
  } catch (error) {
    next(error);
  }
};

export const updateNotificationExpressionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _addressToListen } = req.body;

    const errorMessage = checkForObjectKeys(["_addressToListen"], req.body);

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const regex = /^0x[a-fA-F0-9]{40}$/;

    if (!regex.test(_addressToListen)) {
      throw new RequestBodyError(`Invalid "${_addressToListen}" address`);
    }

    const notificationResponse = await getNotification();

    if (!notificationResponse.success) {
      throw notificationResponse.error;
    }

    const {
      data: { id: notificationId },
    } = notificationResponse;

    const expression = btoa(
      `tx_from == '${_addressToListen}' || tx_to == '${_addressToListen}'`
    );

    const updatePayload = {
      expression,
    };

    const { data, error, success } = await updateNotification(
      notificationId,
      updatePayload
    );

    if (!success) {
      throw error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};
