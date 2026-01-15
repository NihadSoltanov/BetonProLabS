import React, { memo, useEffect } from 'react';
import { OrderCard } from 'src/components/OrderCard';
import { OrderDto } from 'src/domain/models/Order';
import { useTranslate } from 'src/i18n/useTranslate';

type Props = {
  item: OrderDto;
  plantId: string; // parent'tan geliyorsa
};

const OrderItem = ({ item, plantId }: Props) => {
  const { t } = useTranslate();

  // ✅ Debug: nereden geliyor net görelim
  useEffect(() => {
    console.log('🧩 OrderItem DEBUG', {
      propPlantId: plantId,
      itemPlantId: (item as any)?.plant_id,
      itemPlantIdCamel: (item as any)?.plantId, // yanlış alan var mı diye
      order_id: item?.order_id,
    });
  }, [plantId, item]);

  // ✅ En doğru kaynak: backend'in döndürdüğü plant_id
  const resolvedPlantId = String((item as any)?.plant_id ?? plantId ?? '');

  useEffect(() => {
    console.log('✅ OrderItem resolvedPlantId =', resolvedPlantId);
  }, [resolvedPlantId]);

  return (
    <>
      {item && (
        <OrderCard
          isOngoingOrder={false}
          plantId={resolvedPlantId} // ✅ DOĞRU
          order={item}
          customer={item?.customer}
          order_id={item?.order_id}
          product={item?.product}
          amount={item?.amount}
          delivery_data={item?.delivery_data}
          delivery_address={item?.delivery_address}
          status={item?.status}
          delivery_interval={item?.delivery_interval}
          latitude={item?.latitude}
          longitude={item?.longitude}
          plant_id={(item as any)?.plant_id}
          delivery={item?.delivery}
          leftButtonText={t('slump')}
          rightButtonText={t('strength')}
          middleButtonText={t('freeze')}
          newLength={35}
        />
      )}
    </>
  );
};

export default memo(OrderItem);
